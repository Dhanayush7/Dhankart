import "../css/Categories.css";

function Categories() {
  const categories = [
    "Fashion",
    "Electronics",
    "Shoes",
    "Watches"
  ];

  return (
    <section className="categories">
      <h2>Shop by Category</h2>

      <div className="category-grid">
        {categories.map((category) => (
          <div className="category-card" key={category}>
            {category}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;