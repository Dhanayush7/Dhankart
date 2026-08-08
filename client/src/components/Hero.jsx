import { Link } from "react-router-dom";
import "../css/Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="hero-tag">
          🔥 Biggest Sale of the Year
        </span>

        <h1>
          Upgrade Your <span>Shopping</span>
          <br />
          Experience Today
        </h1>

        <p>
          Discover premium fashion, electronics, shoes,
          accessories and much more at unbeatable prices.
          Shop smarter with Dhankart.
        </p>

        <div className="hero-buttons">

          <Link to="/products" className="shop-btn">
            Shop Now →
          </Link>

          <Link to="/products" className="explore-btn">
            Explore Products
          </Link>

        </div>

      </div>

      <div className="hero-image">

        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900"
          alt="Featured Product"
        />

      </div>

    </section>
  );
}

export default Hero;