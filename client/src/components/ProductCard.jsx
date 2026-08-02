import "../css/ProductCard.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaHeart, FaEye, FaStar } from "react-icons/fa";
import { WishlistContext } from "../context/WishlistContext";

function ProductCard({ product }) {
  const { cart, setCart } = useContext(CartContext);
  const { wishlist, setWishlist } = useContext(WishlistContext);

  const addToCart = () => {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: (item.quantity || 1) + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const toggleWishlist = () => {
    const exists = wishlist.find((item) => item.id === product.id);

    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
      useEffect(() => {
  console.log(wishlist);
}, [wishlist]);
    }
  };

  return (
    <div className="product-card">

      <span className="discount">
        -{product.discount}%
      </span>

      <img
        src={product.image}
        alt={product.name}
      />

      <div className="top-icons">
        <FaHeart onClick={toggleWishlist} className="wishlist-icon" />
        <FaEye />
      </div>

      <p className="brand">
        {product.brand}
      </p>

      <h3>{product.name}</h3>

      <div className="rating">
        <FaStar />
        <span>{product.rating}</span>
      </div>

      <div className="price-box">

        <span className="new-price">
          ₹{product.price}
        </span>

        <span className="old-price">
          ₹{product.originalPrice}
        </span>

      </div>

      <p className="stock">
        {product.stock > 0
          ? `Only ${product.stock} left`
          : "Out of Stock"}
      </p>

      <button onClick={addToCart}>
        Add To Cart
      </button>

    </div>
  );
}

export default ProductCard;