      import Link from "next/link";
import styles from "../checkout.module.css";

export default async function CheckoutSuccessPage({ searchParams }) {
  const { orderId } = await searchParams;

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.emptyBox}>
          <h1>Order Placed Successfully 🎉</h1>
          <p>
            Thank you for your order! A confirmation email has been sent to you.
            {orderId && (
              <>
                <br />
                Order ID: <strong>{orderId}</strong>
              </>
            )}
          </p>
          <div style={{ marginTop: 20 }}>
            <Link href="/store" style={{ color: "#2F6FED", fontWeight: 600, textDecoration: "none" }}>
              Continue Shopping →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}