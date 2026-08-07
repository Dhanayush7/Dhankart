import { Link } from "react-router-dom";

function Admin() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
      }}
    >
      <h1>Admin Dashboard</h1>

      <hr />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <Link to="/admin/products">
          <button
            style={{
              width: "100%",
              padding: "20px",
            }}
          >
            📦 Manage Products
          </button>
        </Link>

        <Link to="/admin/orders">
          <button
            style={{
              width: "100%",
              padding: "20px",
            }}
          >
            📋 Manage Orders
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Admin;