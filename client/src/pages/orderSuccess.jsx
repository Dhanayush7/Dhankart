import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "80px auto",
        textAlign: "center",
        padding: "40px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        background: "#fff",
      }}
    >
      <div style={{ fontSize: "70px" }}>✅</div>

      <h1>Order Placed Successfully!</h1>

      <p>
        Thank you for shopping with <b>Dhankart</b>.
      </p>

      <p>Your order has been received and is being processed.</p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/products">
          <button
            style={{
              padding: "12px 20px",
              marginRight: "15px",
              cursor: "pointer",
            }}
          >
            Continue Shopping
          </button>
        </Link>

        <Link to="/orders">
          <button
            style={{
              padding: "12px 20px",
              cursor: "pointer",
            }}
          >
            View My Orders
          </button>
        </Link>
      </div>
    </div>
  );
}
//changed
export default OrderSuccess;