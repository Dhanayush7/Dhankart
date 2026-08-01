import "../css/ProductCard.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";


function ProductCard({ product }) {
 const { cart, setCart } = useContext(CartContext);

  const addToCart = () => {
  console.log("Before:", cart);

  const newCart = [...cart, product];

  console.log("After:", newCart);

  setCart(newCart);
};
    

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>

      <p className="price">₹{product.price}</p>

    <button onClick={addToCart}>
  Add to Cart
</button>
    </div>
  );
}

export default ProductCard;