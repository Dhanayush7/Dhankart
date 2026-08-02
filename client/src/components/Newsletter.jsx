import "../css/Newsletter.css";

function Newsletter() {
  return (
    <section className="newsletter">

      <h2>Stay Updated</h2>

      <p>
        Subscribe to get exclusive offers,
        new arrivals and discounts.
      </p>

      <div className="newsletter-box">

        <input
          type="email"
          placeholder="Enter your email"
        />

        <button>
          Subscribe
        </button>

      </div>

    </section>
  );
}

export default Newsletter;