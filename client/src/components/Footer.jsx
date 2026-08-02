import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-column">
        <h2>DhanKart</h2>

        <p>
          Your one-stop destination for
          premium shopping.
        </p>
      </div>

      <div className="footer-column">
        <h3>Quick Links</h3>

        <p>Home</p>
        <p>Products</p>
        <p>Categories</p>
        <p>Contact</p>
      </div>

      <div className="footer-column">
        <h3>Support</h3>

        <p>FAQs</p>
        <p>Privacy Policy</p>
        <p>Terms & Conditions</p>
      </div>

      <div className="footer-column">
        <h3>Contact</h3>

        <p>📧 support@dhankart.com</p>
        <p>📞 +91 7147638799</p>
      </div>

    </footer>
  );
}

export default Footer;