import { useEffect, useState } from "react";
import {
  FaBox,
  FaShoppingBag,
  FaRupeeSign,
  FaUsers,
} from "react-icons/fa";

import API from "../services/api";
import "../css/AdminDashboard.css";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    try {
      const productsResponse = await API.get("/products");
      setProducts(productsResponse.data);

      const ordersResponse = await API.get("/orders");
      setOrders(ordersResponse.data);
    } catch (error) {
      console.error("Admin dashboard error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.totalAmount || 0),
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  return (
    <div className="admin-page">

      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage your DhanKart store.</p>
        </div>
      </div>

      {/* STAT CARDS */}

      <div className="admin-stats">

        <div className="admin-stat-card">
          <div className="stat-icon blue">
            <FaBox />
          </div>

          <div>
            <p>Total Products</p>
            <h2>{products.length}</h2>
          </div>
        </div>


        <div className="admin-stat-card">
          <div className="stat-icon green">
            <FaShoppingBag />
          </div>

          <div>
            <p>Total Orders</p>
            <h2>{orders.length}</h2>
          </div>
        </div>


        <div className="admin-stat-card">
          <div className="stat-icon orange">
            <FaRupeeSign />
          </div>

          <div>
            <p>Total Revenue</p>
            <h2>
              ₹{totalRevenue.toFixed(2)}
            </h2>
          </div>
        </div>


        <div className="admin-stat-card">
          <div className="stat-icon purple">
            <FaUsers />
          </div>

          <div>
            <p>Pending Orders</p>
            <h2>{pendingOrders}</h2>
          </div>
        </div>

      </div>


      {/* RECENT ORDERS */}

      <div className="admin-section">

        <div className="section-heading">
          <h2>Recent Orders</h2>
        </div>

        {orders.length === 0 ? (

          <div className="admin-empty">
            No orders found.
          </div>

        ) : (

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {orders.slice(0, 10).map((order) => (

                  <tr key={order._id}>

                    <td>
                      #{order._id.slice(-8).toUpperCase()}
                    </td>

                    <td>
                      {order.shippingAddress?.fullName ||
                        "Customer"}
                    </td>

                    <td>
                      ₹{Number(
                        order.totalAmount || 0
                      ).toFixed(2)}
                    </td>

                    <td>
                      <span
                        className={`admin-status ${
                          order.status?.toLowerCase()
                        }`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminDashboard;