"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { calculateDeliveryCharge } from "@/lib/deliveryConfig";
import styles from "./cart.module.css";

export default function CartPage() {
  const { items, updateQty, removeFromCart, clearCart, totalItems, totalPrice } = useCart();
  const deliveryCharge = calculateDeliveryCharge(totalPrice);
  const grandTotal = totalPrice + deliveryCharge;

  if (items.length === 0) {
    return (
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.empty}>
            <h1>Your Cart is Empty</h1>
            <p>Browse our Ayurvedic products and add something to your cart.</p>
            <Link href="/store" className={styles.browseBtn}>
              Browse Store
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Your Cart ({totalItems} item{totalItems !== 1 ? "s" : ""})</h1>

        <div className={styles.list}>
          {items.map((item) => (
            <div className={styles.item} key={item._id}>
              <div className={styles.itemImage}>
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <div className={styles.noImage}>No Image</div>
                )}
              </div>

              <div className={styles.itemInfo}>
                <Link href={`/store/${item._id}`}>{item.name}</Link>
                <span className={styles.itemPrice}>₹{item.price}</span>
              </div>

              <div className={styles.qtyRow}>
                <button onClick={() => updateQty(item._id, item.qty - 1)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
              </div>

              <div className={styles.itemTotal}>₹{item.qty * item.price}</div>

              <button
                className={styles.removeBtn}
                onClick={() => removeFromCart(item._id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <button className={styles.clearBtn} onClick={clearCart}>
            Clear Cart
          </button>

          <div className={styles.summaryLine}>
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className={styles.summaryLine}>
            <span>Delivery Charge</span>
            <span>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</span>
          </div>

          <div className={styles.totalRow}>
            <span>Total</span>
            <span className={styles.totalAmount}>₹{grandTotal}</span>
          </div>

          <Link href="/checkout" className={styles.checkoutBtn}>
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}