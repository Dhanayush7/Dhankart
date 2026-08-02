import "../css/Testimonials.css";

const testimonials = [
  {
    name: "Ava Carter",
    role: "Fashion Lover",
    quote:
      "The collection is stunning and the delivery was faster than expected. I am very happy with my experience!",
  },
  {
    name: "Noah Patel",
    role: "Tech Buyer",
    quote:
      "Great prices, great quality, and the site made it so easy to compare products before I ordered.",
  },
  {
    name: "Mia Thompson",
    role: "Weekend Shopper",
    quote:
      "I love the smooth checkout and the support team answered all my questions promptly.",
  },
];

function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="section-container">
        <div className="section-heading">
          <p className="section-label">Customer Stories</p>
          <h2>What our happy customers are saying</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <p className="testimonial-quote">“{testimonial.quote}”</p>
              <div className="testimonial-meta">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
