import "../css/SearchBar.css";

function SearchBar({ search, setSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        name="product-search"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search products"
      />
    </div>
  );
}

export default SearchBar;
