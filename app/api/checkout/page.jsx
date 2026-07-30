"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { calculateDeliveryCharge } from "@/lib/deliveryConfig";
import styles from "./checkout.module.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

// Dynamically loads the Razorpay checkout script once, the first time it's needed
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-checkout-js")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-checkout-js";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | processing | error
  const [error, setError] = useState("");

  const deliveryCharge = calculateDeliveryCharge(totalPrice);
  const grandTotal = totalPrice + deliveryCharge;

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handlePayment(e) {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setStatus("processing");

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setError("Failed to load payment gateway. Check your internet connection.");
      setStatus("error");
      return;
    }

    try {
      // Step 1: create a Razorpay order (server verifies real prices/stock)
      const orderRes = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i._id, qty: i.qty })),
          customer: form,
        }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.success) {
        setError(orderData.message || "Could not start payment. Please try again.");
        setStatus("error");
        return;
      }

      // Step 2: open the Razorpay payment popup
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "SK Healthcare",
        description: "Order Payment",
        order_id: orderData.razorpayOrderId,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#0B2E4E" },
        handler: async function (response) {
          // Step 3: verify the payment signature on the server, then save the order
          try {
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                items: orderData.items,
                customer: form,
                subtotal: orderData.subtotal,
                deliveryCharge: orderData.deliveryCharge,
                total: orderData.total,
              }),
            });
            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              setError("Payment succeeded but order verification failed. Please contact us with your payment ID.");
              setStatus("error");
              return;
            }

            clearCart();
            router.push(`/checkout/success?orderId=${verifyData.orderId}`);
          } catch (err) {
            console.error(err);
            setError("Payment succeeded but something went wrong saving your order. Please contact us.");
            setStatus("error");
          }
        },
        modal: {
          ondismiss: function () {
            setStatus("idle");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (items.length === 0) {
    return (
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.emptyBox}>
            <h1>Your Cart is Empty</h1>
            <p>Add some products before checking out.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Checkout</h1>

        <div className={styles.grid}>
          <form className={styles.form} onSubmit={handlePayment}>
            <h2>Delivery Details</h2>

            {error && <div className={styles.errorBox}>{error}</div>}

            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <label>Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className={styles.field}>
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className={styles.field}>
                <label>Phone</label>
                <input type="tel" name="phone" maxLength={10} value={form.phone} onChange={handleChange} required />
              </div>
              <div className={styles.field}>
                <label>Pincode</label>
                <input name="pincode" value={form.pincode} onChange={handleChange} required />
              </div>
              <div className={styles.field + " " + styles.full}>
                <label>Address</label>
                <input name="address" value={form.address} onChange={handleChange} required />
              </div>
              <div className={styles.field}>
                <label>City</label>
                <input name="city" value={form.city} onChange={handleChange} required />
              </div>
              <div className={styles.field}>
                <label>State</label>
                <input name="state" value={form.state} onChange={handleChange} required />
              </div>
            </div>

            <button type="submit" className={styles.payBtn} disabled={status === "processing"}>
              {status === "processing" ? "Processing..." : `Pay ₹${grandTotal}`}
            </button>
          </form>

          <div className={styles.summary}>
            <h2>Order Summary</h2>
            {items.map((item) => (
              <div key={item._id} className={styles.summaryItem}>
                <span>{item.name} × {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
            <div className={styles.summaryLine}>
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className={styles.summaryLine}>
              <span>Delivery</span>
              <span>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}