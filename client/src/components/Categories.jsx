import { Link } from "react-router-dom";
import { categories } from "../data/products";
import "../css/Categories.css";

function Categories() {
  return (
    <section className="categories">
      <h2>Shop by Category</h2>

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            className="category-card"
            key={category}
            to={`/products?category=${encodeURIComponent(category)}`}
          >
            {category}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;
