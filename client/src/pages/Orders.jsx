import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaTruck,
} from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";
import { getOrders } from "../services/orderService";

import "../css/Orders.css";

function Orders() {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const userId = user?._id || user?.id;

      if (!userId) {
        console.error("User ID missing");
        return;
      }

      const data = await getOrders(userId);

      setOrders(data || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    if (status === "Delivered") {
      return <FaCheckCircle />;
    }

    if (status === "Shipped") {
      return <FaTruck />;
    }

    return <FaClock />;
  };

  const getStatusClass = (status) => {
    if (status === "Delivered") {
      return "delivered";
    }

    if (status === "Shipped") {
      return "shipped";
    }

    if (status === "Cancelled") {
      return "cancelled";
    }

    return "pending";
  };

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="orders-spinner"></div>

        <h2>Loading your orders...</h2>
      </div>
    );
  }

  return (
    <div className="orders-page">

      {/* HEADER */}

      <div className="orders-header">

        <div>
          <h1>My Orders</h1>

          <p>
            Track and manage all your DhanKart orders.
          </p>
        </div>

        <div className="orders-count">
          <FaBoxOpen />

          <span>
            {orders.length} Orders
          </span>
        </div>

      </div>


      {/* EMPTY */}

      {orders.length === 0 ? (

        <div className="orders-empty">

          <FaBoxOpen />

          <h2>No Orders Yet</h2>

          <p>
            Looks like you haven't placed an order yet.
          </p>

          <Link to="/products">
            <button>
              Start Shopping
            </button>
          </Link>

        </div>

      ) : (

        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="order-card"
              key={order._id}
            >

              {/* ORDER HEADER */}

              <div className="order-top">

                <div>

                  <span className="order-label">
                    ORDER ID
                  </span>

                  <h3>
                    #{order._id.slice(-8).toUpperCase()}
                  </h3>

                </div>


                <div
                  className={`order-status ${getStatusClass(
                    order.status
                  )}`}
                >
                  {getStatusIcon(order.status)}

                  <span>
                    {order.status || "Pending"}
                  </span>
                </div>

              </div>


              {/* DATE */}

              <div className="order-date">

                Ordered on{" "}

                {order.createdAt
                  ? new Date(
                      order.createdAt
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Date unavailable"}

              </div>


              {/* PRODUCTS */}

              <div className="order-products">

                {order.items?.map((item, index) => {

                  if (!item.product) {
                    return (
                      <div
                        className="deleted-product"
                        key={index}
                      >
                        Product no longer available.
                      </div>
                    );
                  }

                  return (

                    <div
                      className="order-product"
                      key={item._id || index}
                    >

                      <img
                        src={item.product.image}
                        alt={item.product.name}
                      />

                      <div className="order-product-info">

                        <h3>
                          {item.product.name}
                        </h3>

                        <p>
                          {item.product.brand}
                        </p>

                        <span>
                          Quantity: {item.quantity}
                        </span>

                      </div>

                      <strong>
                        ₹
                        {(
                          Number(item.product.price || 0) *
                          Number(item.quantity || 0)
                        ).toFixed(2)}
                      </strong>

                    </div>

                  );
                })}

              </div>


              {/* FOOTER */}

              <div className="order-bottom">

                <div>

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    ₹
                    {Number(
                      order.totalAmount || 0
                    ).toFixed(2)}
                  </strong>

                </div>

                <div>

                  <span>
                    Payment
                  </span>

                  <strong>
                    {order.paymentMethod ||
                      "Cash on Delivery"}
                  </strong>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Orders;