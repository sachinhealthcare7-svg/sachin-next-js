import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import razorpay, { calculateDeliveryCharge } from "@/lib/razorpay";

// POST /api/checkout/create-order
// Body: { items: [{ productId, qty }], customer: {...} }
// Prices are re-fetched from the database here — never trust cart prices
// sent from the browser, since those could be tampered with.
export async function POST(request) {
  try {
    const { items, customer } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Cart is empty" },
        { status: 400 }
      );
    }

    if (
      !customer?.name ||
      !customer?.email ||
      !customer?.phone ||
      !customer?.address ||
      !customer?.city ||
      !customer?.state ||
      !customer?.pincode
    ) {
      return NextResponse.json(
        { success: false, message: "Please fill in all delivery details" },
        { status: 400 }
      );
    }

    await connectDB();

    // Rebuild the order from real DB prices/stock, not client-supplied values
    let subtotal = 0;
    const verifiedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return NextResponse.json(
          { success: false, message: `Product not found: ${item.productId}` },
          { status: 400 }
        );
      }
      if (product.stock < item.qty) {
        return NextResponse.json(
          { success: false, message: `${product.name} has only ${product.stock} left in stock` },
          { status: 400 }
        );
      }

      subtotal += product.price * item.qty;
      verifiedItems.push({
        productId: product._id.toString(),
        name: product.name,
        price: product.price,
        qty: item.qty,
      });
    }

    const deliveryCharge = calculateDeliveryCharge(subtotal);
    const total = subtotal + deliveryCharge;

    // Razorpay expects the amount in paise (smallest currency unit)
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });

    return NextResponse.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      subtotal,
      deliveryCharge,
      total,
      items: verifiedItems,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create order. Please try again." },
      { status: 500 }
    );
  }
}