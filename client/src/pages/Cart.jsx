import { useContext } from "react";
import API from "../services/api";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const increaseQuantity = async (cartItemId) => {
    try {
      const response = await API.post("/cart/increase", {
        cartItemId,
      });

      setCart(response.data.items);
    } catch (error) {
      console.error("Failed to increase quantity", error);
    }
  };

  const decreaseQuantity = async (cartItemId) => {
    try {
      const response = await API.post("/cart/decrease", {
        cartItemId,
      });

      setCart(response.data.items);
    } catch (error) {
      console.error("Failed to decrease quantity", error);
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      const response = await API.post("/cart/remove", {
        cartItemId,
      });

      setCart(response.data.items);
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  // Total Price
  const total = cart.reduce((sum, item) => {
    const price = Number(item.product?.price || 0);
    const quantity = Number(item.quantity || 1);
    return sum + price * quantity;
  }, 0);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <h2>Your cart is empty.</h2>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                gap: "20px",
                margin: "20px 0",
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "10px",
                alignItems: "center",
              }}
            >
              <img
                src={item.product?.image}
                alt={item.product?.name}
                width="120"
                height="120"
                style={{ objectFit: "cover" }}
              />

              <div>
                <h2>{item.product?.name}</h2>

                <p>
                  <strong>Brand:</strong> {item.product?.brand}
                </p>

                <h3>₹{item.product?.price}</h3>

                <p>Quantity: {item.quantity}</p>

                <p>
                  Subtotal: ₹
                  {(item.product?.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => decreaseQuantity(item._id)}
                >
                  -
                </button>

                <button
                  onClick={() => increaseQuantity(item._id)}
                  style={{ margin: "0 10px" }}
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item._id)}
                  style={{
                    marginLeft: "20px",
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <hr />

          <h2>Total Amount: ₹{total.toFixed(2)}</h2>
        </>
      )}
    </div>
  );
}

export default Cart;