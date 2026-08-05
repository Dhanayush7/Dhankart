import "../css/ProductCard.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaEye, FaStar } from "react-icons/fa";
import { addToCart } from "../services/cartService";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import {
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistService";


function ProductCard({ product }) {
  const { setCart } = useContext(CartContext);
  const { wishlist, setWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const productId = product._id || product.id;
  const userId = user?.id || user?._id;

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please log in to add items to cart.");
      return;
    }

    if (!userId) {
      alert("Your session is invalid. Please log in again.");
      return;
    }

    try {
      const addedItem = await addToCart({
        user: userId,
        productId,
        quantity: 1,
      });

      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => {
          const itemProductId = item.product?._id || item.product || item._id;
          return String(itemProductId) === String(productId);
        });

        if (existingItem) {
          return prevCart.map((item) => {
            const itemProductId = item.product?._id || item.product || item._id;
            if (String(itemProductId) === String(productId)) {
              return { ...item, quantity: (item.quantity || 1) + 1 };
            }
            return item;
          });
        }

        return [...prevCart, { ...addedItem, product: product }];
      });

      alert("Product added to cart!");
    } catch (error) {
      console.error("Failed to add product:", error);
      alert(error?.response?.data?.message || "Failed to add product.");
    }
  };

  const toggleWishlist = async () => {
  if (!user) {
    alert("Please login first.");
    return;
  }

  try {
    const existingItem = wishlist.find(
      (item) =>
        String(item.product?._id || item.product) === String(productId)
    );

    if (existingItem) {
      const updatedWishlist = await removeFromWishlist(existingItem._id);
      setWishlist(updatedWishlist);
    } else {
      if (!userId) {
        alert("Your session is invalid. Please log in again.");
        return;
      }

      const updatedWishlist = await addToWishlist({
        user: userId,
        productId,
      });

      setWishlist(updatedWishlist);
    }
  } catch (error) {
    console.error(error);
    alert("Wishlist update failed.");
  }
};

  
  const isWishlisted = wishlist.some(
  (item) =>
    String(item.product?._id || item.product) === String(productId)
);

  return (
    <div className="product-card">
      <span className="discount">
        -{product.discount}%
      </span>

      <Link to={`/product/${productId}`}>
        <img
          src={product.image}
          alt={product.name}
        />
      </Link>

      <div className="top-icons">
        <FaHeart
  onClick={toggleWishlist}
  className={`wishlist-icon ${isWishlisted ? "active" : ""}`}
/>

        <Link to={`/product/${productId}`}>
          <FaEye />
        </Link>
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

      <button onClick={handleAddToCart}>
  Add To Cart
</button>
    </div>
  );

}
export default ProductCard;