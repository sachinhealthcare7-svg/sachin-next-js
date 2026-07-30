"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/admin/dashboard/dashboard.module.css";
import ImageUploader from "./ImageUploader";

const initialForm = { name: "", description: "", price: "", category: "", image: "", stock: "" };

export default function ProductForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        setStatus("error");
        setMessage(result.message || "Failed to add product");
        return;
      }

      setStatus("success");
      setMessage("Product added successfully.");
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
      <h2>Add a New Product</h2>

      {status === "error" && <div className={styles.formError}>{message}</div>}
      {status === "success" && <div className={styles.formSuccess}>{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div>
            <label htmlFor="name">Product Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <input id="category" name="category" value={form.category} onChange={handleChange} placeholder="e.g. Ayurvedic Oils" />
          </div>

          <div className={styles.full}>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="price">Price (₹)</label>
            <input id="price" name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="stock">Stock Quantity</label>
            <input id="stock" name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required />
          </div>

          <div className={styles.full}>
            <ImageUploader
              label="Product Image"
              value={form.image}
              onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
            />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={status === "loading"}>
          {status === "loading" ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}