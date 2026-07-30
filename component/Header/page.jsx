"use client";

import { useState } from "react";
import styles from "./header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <a href="/" className={styles.brand}>
        <svg
          className={styles.mark}
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="20"
            cy="20"
            r="18.5"
            fill="none"
            stroke="#E1EBF2"
            strokeWidth="2"
          />

          <path
            className={styles["mark-pulse"]}
            d="M2 20 H12 L16 8 L22 32 L26 20 H38"
          />
        </svg>

        <span>
          SK Healthcare
          <small>Trusted Medical Care</small>
        </span>
      </a>

      <button
        className={styles.burger}
        onClick={() => setOpen(!open)}
        aria-label="Toggle Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`${styles["nav-links"]} ${open ? styles.open : ""}`}>
        <li>
          <a href="/" className={styles.active}>
            Home
          </a>
        </li>

        <li>
          <a href="/About">About</a>
        </li>

        <li>
          <a href="/Treatment">Treatment</a>
        </li>

        <li>
          <a href="/store">Store</a>
        </li>

        <li>
          <a href="/blogs">Blogs</a>
        </li>

        <li>
          <a href="/consultation">Consultation</a>
        </li>

        <li>
          <a href="/cart">Consultation</a>
        </li>
      </ul>

      <div className={styles["nav-actions"]}>
        <a href="/Consultation" className={styles["btn-consult"]}>
          Consultation
        </a>

        <a href="/appointment" className={styles["btn-book"]}>
          Book Appointment

          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19M19 12L13 6M19 12L13 18"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </nav>
  );
}