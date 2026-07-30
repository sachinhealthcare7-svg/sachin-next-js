"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteEntityButton({ endpoint, className, confirmText }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (confirmText && !window.confirm(confirmText)) return;

    setLoading(true);
    try {
      const res = await fetch(endpoint, { method: "DELETE" });
      const result = await res.json();

      if (!res.ok || !result.success) {
        alert(result.message || "Failed to delete");
        setLoading(false);
        return;
      }

      router.refresh(); // re-run the server component's data fetch
    } catch (err) {
      console.error(err);
      alert("Network error while deleting");
      setLoading(false);
    }
  }

  return (
    <button className={className} onClick={handleDelete} disabled={loading}>
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}