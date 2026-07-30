"use client";

import { useState } from "react";
import styles from "./ImageUploader.module.css";

export default function ImageUploader({ value, onChange, label = "Image" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        setError(result.message || "Upload failed");
        setUploading(false);
        return;
      }

      onChange(result.url);
    } catch (err) {
      console.error(err);
      setError("Network error while uploading");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label>{label}</label>

      {value ? (
        <div className={styles.preview}>
          <img src={value} alt="Preview" />
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => onChange("")}
          >
            Remove
          </button>
        </div>
      ) : (
        <label className={styles.dropzone}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            hidden
          />
          {uploading ? "Uploading..." : "Click to choose an image (max 5MB)"}
        </label>
      )}

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}