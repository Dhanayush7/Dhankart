import "../css/Sort.css";

function Sort({ sortBy, setSortBy }) {
  return (
    <div className="sort-container">
      <label>Sort By:</label>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="default">Default</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
        <option value="az">Name: A-Z</option>
        <option value="za">Name: Z-A</option>
      </select>
    </div>
  );
}

export default Sort;