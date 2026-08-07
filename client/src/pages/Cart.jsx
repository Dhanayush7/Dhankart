import { useContext } from "react";
import { Link } from "react-router-dom";
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
      console.error(error);
    }
  };

  const decreaseQuantity = async (cartItemId) => {
    try {
      const response = await API.post("/cart/decrease", {
        cartItemId,
      });

      setCart(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      const response = await API.post("/cart/remove", {
        cartItemId,
      });

      setCart(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const total = cart.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  const shipping = total > 999 ? 0 : 99;

  const discount = total > 5000 ? total * 0.1 : 0;

  const finalTotal = total + shipping - discount;

  return (
    <div className="cart-page">

      <div className="cart-items">

        <h1>🛒 Shopping Cart</h1>

        {cart.length === 0 ? (
          <h2>Your Cart is Empty</h2>
        ) : (
          cart.map((item) => (
            <div
              className="cart-item"
              key={item._id}
            >
              <img
                src={item.product?.image}
                alt={item.product?.name}
              />

              <div className="item-details">

                <h2>{item.product?.name}</h2>

                <p>{item.product?.brand}</p>

                <div className="item-price">
                  ₹{item.product?.price}
                </div>

                <div className="qty-box">

                  <button
                    onClick={() =>
                      decreaseQuantity(item._id)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(item._id)
                    }
                  >
                    +
                  </button>

                </div>

                <p>
                  <strong>
                    Subtotal :
                  </strong>{" "}
                  ₹
                  {(
                    item.product?.price *
                    item.quantity
                  ).toFixed(2)}
                </p>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeItem(item._id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>
          ))
        )}

      </div>

      {cart.length > 0 && (
        <div className="summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? "FREE" : `₹${shipping}`}
            </span>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total</span>
            <span>₹{finalTotal.toFixed(2)}</span>
          </div>

          <Link to="/checkout">

            <button className="checkout-btn">
              Proceed to Checkout →
            </button>

          </Link>

        </div>
      )}

    </div>
  );
}

export default Cart;