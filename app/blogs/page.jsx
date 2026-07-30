import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import styles from "./blogs.module.css";

export const metadata = {
  title: "Health Blog | SK Healthcare Dharuhera",
  description: "Articles on piles, skin care, and confidential health concerns from SK Healthcare, Dharuhera.",
};

async function getBlogs() {
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(blogs));
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Our Blog</span>
        <h1>Health Insights &amp; Articles</h1>
        <p className={styles.intro}>
          Practical, easy-to-understand write-ups on piles, skin care, and confidential
          health concerns from the team at SK Healthcare.
        </p>

        {blogs.length === 0 ? (
          <div className={styles.empty}>No blog posts published yet. Check back soon.</div>
        ) : (
          <div className={styles.grid}>
            {blogs.map((b) => (
              <Link href={`/blogs/${b.slug}`} key={b._id} className={styles.card}>
                {b.image && (
                  <div className={styles.imageWrap}>
                    <img src={b.image} alt={b.title} loading="lazy" />
                  </div>
                )}
                <div className={styles.cardBody}>
                  <span className={styles.category}>{b.category}</span>
                  <span className={styles.date}>
                    {new Date(b.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    · {b.readTime} min read
                  </span>
                  <h2>{b.title}</h2>
                  <p>{b.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}