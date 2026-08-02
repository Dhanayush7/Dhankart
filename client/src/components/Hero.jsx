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
          Shop Smarter,
          <br />
          Live Better.
        </h1>

        <p>
          Discover premium fashion, electronics,
          shoes and accessories at unbeatable prices.
        </p>

        <div className="hero-buttons">
          <Link to="/products">
            <button className="shop-btn">
              Shop Now
            </button>
          </Link>

          <button className="explore-btn">
            Explore
          </button>
        </div>

      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700"
          alt="Featured Product"
        />
      </div>

    </section>
  );
}

export default Hero;