"use client";

import { useState } from "react";
import styles from "./appointment.module.css";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi (NCT)", "Jammu & Kashmir", "Ladakh", "Chandigarh",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  city: "",
  state: "",
  disease: "",
};

export default function AppointmentPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverMessage, setServerMessage] = useState("");

  const today = new Date().toISOString().split("T")[0];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear the field's error as soon as the user edits it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validateClientSide() {
    const newErrors = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = "Please enter your full name";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!form.date) {
      newErrors.date = "Please select a date";
    }
    if (!form.time) {
      newErrors.time = "Please select a time";
    }
    if (!form.city.trim()) {
      newErrors.city = "Please enter your city";
    }
    if (!form.state) {
      newErrors.state = "Please select your state";
    }
    if (!form.disease.trim() || form.disease.trim().length < 3) {
      newErrors.disease = "Please briefly describe your health concern";
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerMessage("");

    const clientErrors = validateClientSide();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setErrors(result.errors || {});
        setServerMessage(result.message || "Please check the form and try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      console.error(err);
      setStatus("error");
      setServerMessage("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✓</div>
            <h1>Appointment Requested</h1>
            <p>
              Thank you! Your appointment request has been received. Our team will
              contact you shortly to confirm the date and time.
            </p>
            <button
              className={styles.btnPrimary}
              onClick={() => setStatus("idle")}
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>Book an Appointment</span>
          <h1>Schedule Your Confidential Consultation</h1>
          <p>
            Fill in your details below and our team will confirm your appointment
            slot. All information shared is kept strictly confidential.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {serverMessage && (
            <div className={styles.formAlert}>{serverMessage}</div>
          )}

          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Rohit Sharma"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? styles.inputError : ""}
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? styles.inputError : ""}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="10-digit mobile number"
                maxLength={10}
                value={form.phone}
                onChange={handleChange}
                className={errors.phone ? styles.inputError : ""}
              />
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="date">Preferred Date</label>
              <input
                id="date"
                name="date"
                type="date"
                min={today}
                value={form.date}
                onChange={handleChange}
                className={errors.date ? styles.inputError : ""}
              />
              {errors.date && <span className={styles.errorText}>{errors.date}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="time">Preferred Time</label>
              <input
                id="time"
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
                className={errors.time ? styles.inputError : ""}
              />
              {errors.time && <span className={styles.errorText}>{errors.time}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="e.g. Dharuhera"
                value={form.city}
                onChange={handleChange}
                className={errors.city ? styles.inputError : ""}
              />
              {errors.city && <span className={styles.errorText}>{errors.city}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="state">State</label>
              <select
                id="state"
                name="state"
                value={form.state}
                onChange={handleChange}
                className={errors.state ? styles.inputError : ""}
              >
                <option value="">Select your state</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.state && <span className={styles.errorText}>{errors.state}</span>}
            </div>

            <div className={styles.field + " " + styles.fieldFull}>
              <label htmlFor="disease">Describe Your Health Concern</label>
              <textarea
                id="disease"
                name="disease"
                rows={4}
                placeholder="Briefly describe your symptoms or the concern you'd like to discuss..."
                value={form.disease}
                onChange={handleChange}
                className={errors.disease ? styles.inputError : ""}
              />
              {errors.disease && <span className={styles.errorText}>{errors.disease}</span>}
            </div>
          </div>

          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </section>
  );
}