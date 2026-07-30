import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import AddToCartButton from "../../../component/AddToCartButton";
import styles from "../store.module.css";
import { notFound } from "next/navigation";

async function getProduct(id) {
  try {
    await connectDB();
    const product = await Product.findById(id).lean();
    return product ? JSON.parse(JSON.stringify(product)) : null;
  } catch {
    return null; // handles invalid ObjectId format gracefully
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return {};
  return {
    title: `${product.name} | SK Healthcare Store`,
    description: product.description.slice(0, 150),
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return notFound();

  return (
    <section className={styles.wrapper}>
      <div className={styles.detailContainer}>
        <div className={styles.detailImage}>
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className={styles.noImage}>No Image</div>
          )}
        </div>

        <div className={styles.detailInfo}>
          <span className={styles.category}>{product.category}</span>
          <h1>{product.name}</h1>
          <span className={styles.price}>₹{product.price}</span>
          <p className={styles.description}>{product.description}</p>
          <span className={styles.stock}>
            {product.stock > 0 ? `${product.stock} in stock` : "Currently out of stock"}
          </span>

          <AddToCartButton product={product} />
        </div>
      </div>
    </section>
  );
}