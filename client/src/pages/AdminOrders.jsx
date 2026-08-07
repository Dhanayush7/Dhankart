import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/all");
      setOrders(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, { status });

      toast.success("Order Updated");

      fetchOrders();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Manage Orders</h1>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.user?.name || order.user}</td>

              <td>₹{order.totalAmount}</td>

              <td>{order.status}</td>

              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;