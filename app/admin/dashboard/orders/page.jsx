import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import styles from "../dashboard.module.css";

async function getOrders() {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(orders));
}

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <h1>Orders ({orders.length})</h1>

      {orders.length === 0 ? (
        <div className={styles.empty}>No orders placed yet.</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Items</th>
              <th>Delivery Address</th>
              <th>Subtotal</th>
              <th>Delivery</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>
                  {o.customer.name}
                  <br />
                  {o.customer.phone}
                </td>
                <td>
                  {o.items.map((i) => (
                    <div key={i.productId}>{i.name} × {i.qty}</div>
                  ))}
                </td>
                <td>
                  {o.customer.address}, {o.customer.city}, {o.customer.state} - {o.customer.pincode}
                </td>
                <td>₹{o.subtotal}</td>
                <td>₹{o.deliveryCharge}</td>
                <td>₹{o.total}</td>
                <td>
                  <span className={styles.badge}>{o.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}