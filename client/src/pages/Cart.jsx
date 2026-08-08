import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus, FaArrowRight } from "react-icons/fa";

import API from "../services/api";
import { CartContext } from "../context/CartContext";

import "../css/Cart.css";

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const increaseQuantity = async (cartItemId) => {
    try {
      const response = await API.post("/cart/increase", {
        cartItemId,
      });

      setCart(response.data.items);
    } catch (error) {
      console.error("Failed to increase quantity:", error);
    }
  };

  const decreaseQuantity = async (cartItemId) => {
    try {
      const response = await API.post("/cart/decrease", {
        cartItemId,
      });

      setCart(response.data.items);
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      const response = await API.post("/cart/remove", {
        cartItemId,
      });

      setCart(response.data.items);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  /* =========================
     CALCULATIONS
  ========================= */

  const total = cart.reduce((sum, item) => {
    const price = Number(item.product?.price || 0);
    const quantity = Number(item.quantity || 0);

    return sum + price * quantity;
  }, 0);

  const shipping = total === 0 ? 0 : total > 999 ? 0 : 99;

  const discount = total > 5000 ? total * 0.1 : 0;

  const finalTotal = total + shipping - discount;

  /* =========================
     EMPTY CART
  ========================= */

  if (cart.length === 0) {
    return (
      <div className="empty-cart">

        <div className="empty-cart-icon">
          🛒
        </div>

        <h1>Your Cart is Empty</h1>

        <p>
          Looks like you haven't added anything to your cart yet.
        </p>

        <Link to="/products" className="continue-shopping">
          Start Shopping
          <FaArrowRight />
        </Link>

      </div>
    );
  }

  return (
    <div className="cart-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="cart-header">

        <div>
          <h1>Shopping Cart</h1>

          <p>
            {cart.length}{" "}
            {cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <Link to="/products" className="continue-link">
          ← Continue Shopping
        </Link>

      </div>


      <div className="cart-layout">

        {/* =========================
            CART ITEMS
        ========================= */}

        <div className="cart-items">

          {cart.map((item) => {

            const price = Number(
              item.product?.price || 0
            );

            const quantity = Number(
              item.quantity || 0
            );

            const subtotal = price * quantity;

            return (
              <div
                className="cart-item"
                key={item._id}
              >

                {/* IMAGE */}

                <Link
                  to={`/product/${item.product?._id}`}
                  className="cart-image"
                >
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                  />
                </Link>


                {/* DETAILS */}

                <div className="cart-item-details">

                  <p className="cart-brand">
                    {item.product?.brand}
                  </p>

                  <Link
                    to={`/product/${item.product?._id}`}
                    className="cart-product-name"
                  >
                    {item.product?.name}
                  </Link>

                  <p className="cart-price">
                    ₹{price.toFixed(2)}
                  </p>


                  {/* QUANTITY */}

                  <div className="cart-bottom">

                    <div className="quantity-control">

                      <button
                        onClick={() =>
                          decreaseQuantity(item._id)
                        }
                        disabled={quantity <= 1}
                      >
                        <FaMinus />
                      </button>

                      <span>
                        {quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item._id)
                        }
                      >
                        <FaPlus />
                      </button>

                    </div>


                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeItem(item._id)
                      }
                    >
                      <FaTrash />

                      <span>Remove</span>
                    </button>

                  </div>

                </div>


                {/* SUBTOTAL */}

                <div className="cart-subtotal">

                  <span>Subtotal</span>

                  <strong>
                    ₹{subtotal.toFixed(2)}
                  </strong>

                </div>

              </div>
            );
          })}

        </div>


        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <div className="summary">

          <h2>Order Summary</h2>


          <div className="summary-row">

            <span>Items Total</span>

            <span>
              ₹{total.toFixed(2)}
            </span>

          </div>


          <div className="summary-row">

            <span>Shipping</span>

            <span className={shipping === 0 ? "free" : ""}>
              {shipping === 0
                ? "FREE"
                : `₹${shipping.toFixed(2)}`}
            </span>

          </div>


          <div className="summary-row">

            <span>Discount</span>

            <span className="discount-value">
              -₹{discount.toFixed(2)}
            </span>

          </div>


          <div className="summary-divider"></div>


          <div className="summary-row final-total">

            <span>Total</span>

            <strong>
              ₹{finalTotal.toFixed(2)}
            </strong>

          </div>


          <Link
            to="/checkout"
            className="checkout-btn"
          >
            Proceed to Checkout

            <FaArrowRight />

          </Link>


          <div className="secure-message">
            🔒 Secure checkout
          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;