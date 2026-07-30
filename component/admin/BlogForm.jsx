"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/admin/dashboard/dashboard.module.css";
import ImageUploader from "./ImageUploader";

const initialForm = {
  title: "",
  excerpt: "",
  content: "",
  image: "",
  author: "",
  category: "",
  tags: "",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
};

export default function BlogForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        setStatus("error");
        setMessage(result.message || "Failed to publish blog");
        return;
      }

      setStatus("success");
      setMessage("Blog published successfully.");
      setForm(initialForm);
      router.refresh();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className={styles.formCard}>
      <h2>Write a New Blog Post</h2>

      {status === "error" && <div className={styles.formError}>{message}</div>}
      {status === "success" && <div className={styles.formSuccess}>{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.full}>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" value={form.title} onChange={handleChange} required />
          </div>

          <div className={styles.full}>
            <label htmlFor="excerpt">Short Excerpt (shown in the blog listing)</label>
            <input id="excerpt" name="excerpt" value={form.excerpt} onChange={handleChange} required />
          </div>

          <div className={styles.full}>
            <label htmlFor="content">
              Full Content (separate paragraphs with a blank line)
            </label>
            <textarea id="content" name="content" rows={8} value={form.content} onChange={handleChange} required />
          </div>

          <div className={styles.full}>
            <ImageUploader
              label="Cover Image"
              value={form.image}
              onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
            />
          </div>

          <div>
            <label htmlFor="author">Author</label>
            <input id="author" name="author" value={form.author} onChange={handleChange} placeholder="SK Healthcare" />
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <input id="category" name="category" value={form.category} onChange={handleChange} placeholder="e.g. Piles Care" />
          </div>

          <div className={styles.full}>
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input id="tags" name="tags" value={form.tags} onChange={handleChange} placeholder="piles, ayurveda, dharuhera" />
          </div>

          <div className={styles.full} style={{ borderTop: "1px solid #E1EBF2", paddingTop: 16, marginTop: 4 }}>
            <label style={{ marginBottom: 4 }}>SEO Settings (optional — improves Google &amp; AI search visibility)</label>
          </div>

          <div className={styles.full}>
            <label htmlFor="metaTitle">Meta Title (leave blank to use the post title)</label>
            <input id="metaTitle" name="metaTitle" value={form.metaTitle} onChange={handleChange} maxLength={70} />
          </div>

          <div className={styles.full}>
            <label htmlFor="metaDescription">Meta Description (leave blank to use the excerpt)</label>
            <textarea id="metaDescription" name="metaDescription" rows={2} value={form.metaDescription} onChange={handleChange} maxLength={160} />
          </div>

          <div className={styles.full}>
            <label htmlFor="keywords">Focus Keywords (comma-separated)</label>
            <input id="keywords" name="keywords" value={form.keywords} onChange={handleChange} placeholder="piles treatment Dharuhera, ayurvedic piles doctor" />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={status === "loading"}>
          {status === "loading" ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}