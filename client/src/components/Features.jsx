import "../css/Features.css";
import {
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaHeadset,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaTruck />,
      title: "Free Shipping",
      text: "Free delivery on orders over ₹999",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payment",
      text: "100% secure payment gateway",
    },
    {
      icon: <FaUndo />,
      title: "Easy Returns",
      text: "7-day hassle-free returns",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      text: "Always here to help you",
    },
  ];

  return (
    <section className="features">
      <h2>Why Shop With Us?</h2>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;