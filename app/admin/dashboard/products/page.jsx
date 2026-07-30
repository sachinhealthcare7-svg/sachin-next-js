import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductForm from "../../../../component/admin/ProductForm";
import DeleteEntityButton from "../../../../component/admin/DeleteEntityButton";
import styles from "../dashboard.module.css";

async function getProducts() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(products));
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Products ({products.length})</h1>

      <ProductForm />

      {products.length === 0 ? (
        <div className={styles.empty}>No products added yet.</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <DeleteEntityButton
                    endpoint={`/api/products/${p._id}`}
                    className={styles.deleteBtn}
                    confirmText={`Delete "${p.name}"? This cannot be undone.`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}