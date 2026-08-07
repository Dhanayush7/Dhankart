import "../css/ProductCard.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
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
  const productId = product._id || product.legacyId || product.id;
  const userId = user?.id || user?._id;

  const handleAddToCart = async () => {
    if (!user) {
      toast.info("Please log in to add items to your cart.");
      return;
    }

    if (!userId) {
      toast.error("Your session is invalid. Please log in again.");
      return;
    }

    try {
      const updatedCart = await addToCart({
        user: userId,
        productId,
        quantity: 1,
      });

      setCart(updatedCart);
      toast.success("Added to cart successfully!");
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error(error?.response?.data?.message || "Unable to add product to cart.");
    }
  };

  const toggleWishlist = async () => {
  if (!user) {
    toast.info("Please log in first to update your wishlist.");
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
        toast.error("Your session is invalid. Please log in again.");
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
    toast.error("Unable to update wishlist.");
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