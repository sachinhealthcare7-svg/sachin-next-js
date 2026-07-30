import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import styles from "./store.module.css";

export const metadata = {
  title: "Ayurvedic Store | SK Healthcare Dharuhera",
  description: "Browse Ayurvedic medicines and wellness products from SK Healthcare, Dharuhera.",
};

async function getProducts() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(products));
}

export default async function StorePage() {
  const products = await getProducts();

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Our Store</span>
        <h1>Ayurvedic Products &amp; Wellness Essentials</h1>
        <p className={styles.intro}>
          Quality Ayurvedic products recommended by Dr. S.K. Sachin, available for
          home delivery or pickup from the Dharuhera clinic.
        </p>

        {products.length === 0 ? (
          <div className={styles.empty}>No products available right now. Check back soon.</div>
        ) : (
          <div className={styles.grid}>
            {products.map((p) => (
              <Link href={`/store/${p._id}`} key={p._id} className={styles.card}>
                <div className={styles.imageWrap}>
                  {p.image ? (
                    <img src={p.image} alt={p.name} loading="lazy" />
                  ) : (
                    <div className={styles.noImage}>No Image</div>
                  )}
                  {p.stock <= 0 && <span className={styles.outBadge}>Out of Stock</span>}
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.category}>{p.category}</span>
                  <h2>{p.name}</h2>
                  <span className={styles.price}>₹{p.price}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}