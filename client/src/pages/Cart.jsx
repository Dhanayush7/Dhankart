import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  // Increase Quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );

    setCart(updatedCart);
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  // Remove Product
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // Total Price
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <h2>Your cart is empty.</h2>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
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
                src={item.image}
                alt={item.name}
                width="120"
                height="120"
                style={{ objectFit: "cover" }}
              />

              <div>
                <h2>{item.name}</h2>

                <h3>₹{item.price}</h3>

                <p>Quantity: {item.quantity || 1}</p>

                <p>
                  Subtotal: ₹
                  {item.price * (item.quantity || 1)}
                </p>

                <button onClick={() => decreaseQuantity(item.id)}>
                  -
                </button>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  style={{ margin: "0 10px" }}
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item.id)}
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

          <h2>Total Amount: ₹{total}</h2>
        </>
      )}
    </div>
  );
}

export default Cart;