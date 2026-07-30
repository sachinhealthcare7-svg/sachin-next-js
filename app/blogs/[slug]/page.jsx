import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Link from "next/link";
import styles from "../blogs.module.css";
import { notFound } from "next/navigation";

async function getBlog(slug) {
  await connectDB();
  const blog = await Blog.findOne({ slug }).lean();
  return blog ? JSON.parse(JSON.stringify(blog)) : null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return {};

  const title = blog.metaTitle || `${blog.title} | SK Healthcare Blog`;
  const description = blog.metaDescription || blog.excerpt;

  return {
    title,
    description,
    keywords: blog.keywords?.length ? blog.keywords : undefined,
    alternates: {
      canonical: `https://skhealthcare.org/blogs/${blog.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://skhealthcare.org/blogs/${blog.slug}`,
      type: "article",
      images: blog.image ? [{ url: blog.image }] : undefined,
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `https://skhealthcare.org/blogs/${blog.slug}`,
        headline: blog.title,
        description: blog.metaDescription || blog.excerpt,
        image: blog.image || undefined,
        author: {
          "@type": "Person",
          name: blog.author,
        },
        publisher: {
          "@type": "MedicalClinic",
          name: "SK Healthcare",
          url: "https://skhealthcare.org",
        },
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt,
        keywords: blog.keywords?.join(", "),
        articleSection: blog.category,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://skhealthcare.org/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://skhealthcare.org/blogs" },
          { "@type": "ListItem", position: 3, name: blog.title, item: `https://skhealthcare.org/blogs/${blog.slug}` },
        ],
      },
    ],
  };

  return (
    <section className={styles.wrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.detailContainer}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link> / <Link href="/blogs">Blog</Link> / <span>{blog.title}</span>
        </nav>

        <span className={styles.category}>{blog.category}</span>

        <h1>{blog.title}</h1>

        <div className={styles.metaRow}>
          <span>
            {new Date(blog.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span>·</span>
          <span>{blog.author}</span>
          <span>·</span>
          <span>{blog.readTime} min read</span>
        </div>

        {blog.image && (
          <div className={styles.detailImage}>
            <img src={blog.image} alt={blog.title} />
          </div>
        )}

        <div className={styles.content}>
          {blog.content.split("\n").map((para, i) =>
            para.trim() ? <p key={i}>{para}</p> : null
          )}
        </div>

        {blog.tags?.length > 0 && (
          <div className={styles.tagRow}>
            {blog.tags.map((tag) => (
              <span key={tag} className={styles.tag}>#{tag}</span>
            ))}
          </div>
        )}

        <div className={styles.ctaBox}>
          <p>Have a concern related to this topic?</p>
          <Link href="/consultation">Book a Confidential Consultation</Link>
        </div>
      </div>
    </section>
  );
}