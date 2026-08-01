import ProductCard from "./ProductCard";
import "../css/FeaturedProducts.css";

const products = [
  {
    id: 1,
    name: "Nike Shoes",
    price: 3999,
    image: "https://picsum.photos/300/300?random=1"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2499,
    image: "https://picsum.photos/300/300?random=2"
  },
  {
    id: 3,
    name: "Headphones",
    price: 1999,
    image: "https://picsum.photos/300/300?random=3"
  },
  {
    id: 4,
    name: "Backpack",
    price: 1499,
    image: "https://picsum.photos/300/300?random=4"
  }
];

function FeaturedProducts() {
  return (
    <section className="featured">
      <h2>Featured Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;