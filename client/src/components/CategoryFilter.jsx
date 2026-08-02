import "../css/CategoryFilter.css";

function CategoryFilter({ category, setCategory }) {
  const categories = [
    "All",
    "Shoes",
    "Electronics",
    "Fashion",
    "Books"
  ];

  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          className={category === cat ? "active" : ""}
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;