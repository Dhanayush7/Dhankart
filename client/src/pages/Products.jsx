import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import Sort from "../components/Sort";

function Products() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setCategory(searchParams.get("category") || "All");
  }, [searchParams]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Unable to load products:", error);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category?.trim())
        .filter(Boolean)
    ),
  ];

  const filteredProducts = products.filter((product) => {
    const searchTerm = search.trim().toLowerCase();
    const searchableProductText = [
      product.name,
      product.brand,
      product.category,
      product.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableProductText.includes(searchTerm);

    const matchesCategory =
      category === "All" ||
      product.category?.trim().toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts];

  switch (sortBy) {
    case "low":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "high":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "az":
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "za":
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }
  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      <CategoryFilter
        categories={categories}
        category={category}
        setCategory={setCategory}
      />
      <Sort sortBy={sortBy} setSortBy={setSortBy} />

      <div className="product-grid">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product._id || product.id}
            product={product}
          />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <p className="products-empty-state">
          No products match your search or selected category.
        </p>
      )}
    </>
  );
}

export default Products;
  
