import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getOrders } from "../services/orderService";
import "../css/Orders.css";

function Orders() {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const userId = user?._id || user?.id;

      if (!userId) return;

      const data = await getOrders(userId);
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="orders-page">

      <h1 className="orders-title">
        📦 My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No Orders Yet</h2>
          <p>Looks like you haven't purchased anything.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div
            className="order-card"
            key={order._id}
          >

            <div className="order-header">

              <div>
                <h2>Order</h2>

                <p className="order-id">
                  #{order._id}
                </p>

                <p>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </p>

              </div>

              <div
                className={`status ${order.status.toLowerCase()}`}
              >
                {order.status}
              </div>

            </div>

            {order.items.map((item, index) => {

              if (!item.product) {
                return (
                  <div
                    className="order-item"
                    key={index}
                  >
                    <div className="order-info">
                      <h3>Product Deleted</h3>
                      <p>
                        This product is no longer available.
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  className="order-item"
                  key={item._id || index}
                >

                  <img
                    src={item.product.image}
                    alt={item.product.name}
                  />

                  <div className="order-info">

                    <h3>{item.product.name}</h3>

                    <p>
                      Brand: {item.product.brand}
                    </p>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                    <p>
                      Price: ₹{item.product.price}
                    </p>

                  </div>

                </div>
              );
            })}

            <div className="order-total">
              Total : ₹{order.totalAmount}
            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default Orders;