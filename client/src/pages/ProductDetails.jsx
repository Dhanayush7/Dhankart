import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaStar,
  FaTruck,
  FaUndoAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { addToCart } from "../services/cartService";
import Loader from "../components/Loader";

import "../css/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { setCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const productId = product?._id || product?.legacyId || product?.id;
  const userId = user?._id || user?.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setProduct(null);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.info("Please login first.");
      return;
    }

    if (!userId || !productId) {
      toast.error("Unable to identify this product or your account. Please log in again.");
      return;
    }

    try {
      const updatedCart = await addToCart({
        user: userId,
        productId,
        quantity,
      });

      setCart(updatedCart);

      toast.success("Added to Cart");
    } catch (error) {
      console.error("Unable to add product:", error);
      toast.error("Unable to add product");
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      toast.info("Please login first.");
      return;
    }

    if (!userId || !productId) {
      toast.error("Unable to identify this product or your account. Please log in again.");
      return;
    }

    try {
      const updatedCart = await addToCart({
        user: userId,
        productId,
        quantity,
      });

      setCart(updatedCart);
      navigate("/checkout");
    } catch (error) {
      console.error("Unable to buy product:", error);
      toast.error("Unable to add product to cart");
    }
  };

  if (!product) {
    return <Loader />;
  }

  return (
    <div className="product-details">

      <div className="image-section">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="details-section">

        <p className="brand">
          {product.brand}
        </p>

        <h1>{product.name}</h1>

        <div className="rating">
          <FaStar />
          <span>{product.rating}</span>
        </div>

        <div className="price-box">

          <span className="price">
            ₹{product.price}
          </span>

          <span className="old-price">
            ₹{product.originalPrice}
          </span>

          <span className="discount">
            {product.discount}% OFF
          </span>

        </div>

        <p className="stock">
          {product.stock > 0
            ? "✅ In Stock"
            : "❌ Out of Stock"}
        </p>

        <p className="description">
          {product.description}
        </p>

        <div className="quantity">

          <button
            onClick={() =>
              setQuantity(Math.max(1, quantity - 1))
            }
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            onClick={() =>
              setQuantity(quantity + 1)
            }
          >
            +
          </button>

        </div>

        <button
          className="cart-btn"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
        >
          {product.stock > 0
            ? "Add To Cart"
            : "Out of Stock"}
        </button>

        <button
          className="buy-btn"
          onClick={handleBuyNow}
          disabled={product.stock <= 0}
        >
          Buy Now
        </button>

        <div className="extra">

          <div>
            <FaTruck />
            <span>Free Delivery</span>
          </div>

          <div>
            <FaUndoAlt />
            <span>7 Days Return</span>
          </div>

          <div>
            <FaShieldAlt />
            <span>Secure Payment</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;
