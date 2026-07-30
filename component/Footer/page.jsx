import "./footer.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-col">
          <h2 className="footer-logo">SK Healthcare</h2>
          <p className="footer-text">
            Providing trusted healthcare services with compassion,
            innovation, and excellence. Your health is our priority.
          </p>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/treatment">Treatment</Link></li>
            <li><Link href="/blogs">Blogs</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Our Services</h3>
          <ul>
            <li><Link href="/consultation">Consultation</Link></li>
            <li><Link href="/appointment">Book Appointment</Link></li>
            <li><Link href="/store">Medical Store</Link></li>
            <li><Link href="/health-checkup">Health Checkup</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact</h3>

          <p>📍 Faridabad, Haryana, India</p>
          <p>📞 +91 9876543210</p>
          <p>✉ info@skhealthcare.org</p>

          <div className="social-links">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">YouTube</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} SK Healthcare. All Rights Reserved.
      </div>
    </footer>
  );
}