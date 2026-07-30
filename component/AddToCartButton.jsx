"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import styles from "./AddToCartButton.module.css";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const outOfStock = product.stock <= 0;

  return (
    <div className={styles.wrap}>
      <div className={styles.qtyRow}>
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          disabled={outOfStock}
        >
          −
        </button>
        <span>{qty}</span>
        <button
          type="button"
          onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
          disabled={outOfStock}
        >
          +
        </button>
      </div>

      <button
        className={styles.addBtn}
        onClick={handleAdd}
        disabled={outOfStock}
      >
        {outOfStock ? "Out of Stock" : added ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
}