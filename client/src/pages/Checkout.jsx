import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { placeOrder } from "../services/orderService";

function Checkout() {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { setCart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.info("Please log in first to place your order.");
      return;
    }

    try {
      setLoading(true);
      console.log("Logged in user:", user);

      const userId = user?._id || user?.id;
      console.log("User ID:", userId);

      await placeOrder({
        user: userId,
        shippingAddress: formData,
        paymentMethod: "Cash on Delivery",
      });

      toast.success("Order placed successfully!");
      setCart([]);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "500px" }}>
      <h1>Checkout</h1>

      <h2>Shipping Address</h2>

      <input
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        name="pincode"
        placeholder="Pincode"
        value={formData.pincode}
        onChange={handleChange}
      />

      <br />
      <br />

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

export default Checkout;