import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { sendOrderConfirmation, sendAdminOrderNotification } from "@/lib/mailer";

// POST /api/checkout/verify
// Verifies the Razorpay payment signature (proves the payment is genuine and
// wasn't forged client-side), then saves the order and reduces stock.
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      customer,
      subtotal,
      deliveryCharge,
      total,
    } = body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }

    await connectDB();

    const order = await Order.create({
      items,
      customer,
      subtotal,
      deliveryCharge,
      total,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      status: "paid",
    });

    // Reduce stock for each purchased product (best-effort, doesn't block the response)
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.qty },
      });
    }

    // Email notifications are best-effort — payment already succeeded either way
    try {
      await Promise.all([
        sendOrderConfirmation(order),
        sendAdminOrderNotification(order),
      ]);
    } catch (emailError) {
      console.error("Order email error:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified and order placed",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong while verifying payment" },
      { status: 500 }
    );
  }
}