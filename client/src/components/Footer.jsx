import "../css/Footer.css";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">

          <h2 className="footer-logo">
            🛍️ Dhan<span>Kart</span>
          </h2>

          <p>
            Dhankart is your one-stop destination for
            premium fashion, electronics, footwear,
            accessories and lifestyle products at the
            best prices.
          </p>

        </div>

        <div className="footer-section">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>

        </div>

        <div className="footer-section">

          <h3>Customer Care</h3>

          <a href="#">Help Center</a>
          <a href="#">Returns</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>

        </div>

        <div className="footer-section">

          <h3>Contact</h3>

          <p>
            <FaMapMarkerAlt />
            Mathura, Uttar Pradesh
          </p>

          <p>
            <FaPhone />
            +91 XXXXX XXXXX
          </p>

          <p>
            <FaEnvelope />
            support@dhankart.com
          </p>

          <div className="social-icons">

            <a href="#">
              <FaFacebook />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

            <a href="#">
              <FaLinkedin />
            </a>

          </div>

        </div>

      </div>

      <hr />

      <div className="footer-bottom">

        © 2026 Dhankart. All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;