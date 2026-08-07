import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaTruck, FaUndoAlt, FaShieldAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { addToCart } from "../services/cartService";

import "../css/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const { user } = useContext(AuthContext);
  const { setCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.info("Please login first.");
      return;
    }

    try {
      const updatedCart = await addToCart({
        user: user._id || user.id,
        productId: product._id,
        quantity,
      });

      setCart(updatedCart);
      toast.success("Added to Cart");
    } catch (error) {
      toast.error("Unable to add product");
    }
  };

 import Loader from "../components/Loader";

if (!product) {
  return <Loader />;
}

  return (
    <div className="product-details">

      <div className="image-section">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="details-section">

        <p className="brand">{product.brand}</p>

        <h1>{product.name}</h1>

        <div className="rating">
          <FaStar />
          <span>{product.rating}</span>
        </div>

        <div className="price-box">
          <span className="price">₹{product.price}</span>

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
        >
          Add To Cart
        </button>

        <button className="buy-btn">
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