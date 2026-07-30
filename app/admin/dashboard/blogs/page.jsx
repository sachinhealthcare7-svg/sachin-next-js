"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../dashboard.module.css";

const initialForm = { title: "", excerpt: "", content: "", image: "", author: "" };

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
      router.refresh(); // refresh the list below
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
            <label htmlFor="content">Full Content</label>
            <textarea id="content" name="content" value={form.content} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="image">Cover Image URL</label>
            <input id="image" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
          </div>

          <div>
            <label htmlFor="author">Author (optional)</label>
            <input id="author" name="author" value={form.author} onChange={handleChange} placeholder="SK Healthcare" />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={status === "loading"}>
          {status === "loading" ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}