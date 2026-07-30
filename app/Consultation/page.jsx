"use client";

import { useState } from "react";
import "./Consultation.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  disease: "",
  doctor: "General Physician",
  message: "",
};

export default function Consultation() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setStatus("loading");

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        setError(result.message || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <>
      <section className="consultHero">
        <div className="container">
          <h1>Book Your Consultation</h1>
          <p>
            Connect with our experienced healthcare professionals and receive
            personalized medical advice for your health concerns.
          </p>
        </div>
      </section>

      <section className="consultSection">
        <div className="container consultGrid">

          <div className="consultInfo">
            <h2>Why Consult With SK Healthcare?</h2>

            <div className="infoCard">
              <h3>👨‍⚕️ Expert Doctors</h3>
              <p>Experienced specialists across multiple healthcare fields.</p>
            </div>

            <div className="infoCard">
              <h3>📅 Easy Appointment</h3>
              <p>Book your consultation online in just a few minutes.</p>
            </div>

            <div className="infoCard">
              <h3>🏥 Personalized Care</h3>
              <p>Every treatment plan is tailored to your specific needs.</p>
            </div>

            <div className="infoCard">
              <h3>📞 24/7 Support</h3>
              <p>Our support team is available whenever you need assistance.</p>
            </div>
          </div>

          <div className="consultForm">
            <h2>Consultation Form</h2>

            {status === "success" ? (
              <div className="formSuccess">
                Thank you! Your consultation request has been received. Our
                team will contact you shortly to confirm.
                <br />
                <button type="button" onClick={() => setStatus("idle")}>
                  Book Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && <div className="formError">{error}</div>}

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (10 digits)"
                  maxLength={10}
                  value={form.phone}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="disease"
                  placeholder="Disease / Health Concern"
                  value={form.disease}
                  onChange={handleChange}
                />

                <select name="doctor" value={form.doctor} onChange={handleChange}>
                  <option>General Physician</option>
                  <option>Cardiologist</option>
                  <option>Diabetologist</option>
                  <option>Orthopedic</option>
                  <option>Pulmonologist</option>
                </select>

                <textarea
                  name="message"
                  rows="5"
                  placeholder="Describe your health problem..."
                  value={form.message}
                  onChange={handleChange}
                ></textarea>

                <button type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "Booking..." : "Book Consultation"}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      <section className="process">
        <div className="container">

          <h2>How It Works</h2>

          <div className="processGrid">

            <div className="step">
              <span>1</span>
              <h3>Fill Form</h3>
              <p>Complete the consultation request form.</p>
            </div>

            <div className="step">
              <span>2</span>
              <h3>Doctor Review</h3>
              <p>Our medical expert reviews your request.</p>
            </div>

            <div className="step">
              <span>3</span>
              <h3>Schedule Time</h3>
              <p>Choose a suitable consultation time.</p>
            </div>

            <div className="step">
              <span>4</span>
              <h3>Get Consultation</h3>
              <p>Receive expert medical advice and treatment.</p>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}