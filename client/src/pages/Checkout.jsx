import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCreditCard, FaShoppingBag } from "react-icons/fa";
import { toast } from "react-toastify";

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

import "../css/Checkout.css";

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     PRICE CALCULATIONS
  ========================= */

  const total = cart.reduce((sum, item) => {
    const price = Number(item.product?.price || 0);
    const quantity = Number(item.quantity || 0);

    return sum + price * quantity;
  }, 0);

  const shipping = total > 999 ? 0 : 99;

  const discount = total > 5000 ? total * 0.1 : 0;

  const finalTotal = total + shipping - discount;


  /* =========================
     PLACE ORDER
  ========================= */

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.info("Please login first.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      navigate("/products");
      return;
    }

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      toast.error("Please fill all shipping details.");
      return;
    }

    try {
      setLoading(true);

      const orderItems = cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      const response = await API.post("/orders", {
        user: user._id || user.id,

        items: orderItems,

        totalAmount: finalTotal,

        shippingAddress: formData,

        paymentMethod: "Cash on Delivery",

        status: "Pending",
      });

      console.log("Order created:", response.data);

      setCart([]);

      toast.success("Order placed successfully! 🎉");

      navigate("/orders");

    } catch (error) {
      console.error("Order failed:", error);

      toast.error(
        error?.response?.data?.message ||
        "Unable to place order."
      );

    } finally {
      setLoading(false);
    }
  };


  /* =========================
     EMPTY CART
  ========================= */

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">

        <FaShoppingBag />

        <h1>Your cart is empty</h1>

        <p>
          Add some products before proceeding to checkout.
        </p>

        <button
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>

      </div>
    );
  }


  return (
    <div className="checkout-page">

      <div className="checkout-header">

        <h1>Checkout</h1>

        <p>
          Complete your order securely
        </p>

      </div>


      <form
        className="checkout-layout"
        onSubmit={handlePlaceOrder}
      >

        {/* =========================
            SHIPPING
        ========================= */}

        <div className="checkout-main">

          <section className="checkout-card">

            <div className="section-title">

              <div className="section-icon">
                <FaMapMarkerAlt />
              </div>

              <div>
                <h2>Shipping Address</h2>

                <p>
                  Where should we deliver your order?
                </p>
              </div>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />

              </div>


              <div className="form-group">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />

              </div>


              <div className="form-group full-width">

                <label>
                  Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House no., street, area..."
                  rows="3"
                />

              </div>


              <div className="form-group">

                <label>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />

              </div>


              <div className="form-group">

                <label>
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                />

              </div>


              <div className="form-group">

                <label>
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                  maxLength="6"
                />

              </div>

            </div>

          </section>


          {/* =========================
              PAYMENT
          ========================= */}

          <section className="checkout-card">

            <div className="section-title">

              <div className="section-icon">
                <FaCreditCard />
              </div>

              <div>
                <h2>Payment Method</h2>

                <p>
                  Choose your preferred payment method
                </p>
              </div>

            </div>


            <div className="payment-option selected">

              <div className="payment-radio">
                ✓
              </div>

              <div>

                <h3>
                  Cash on Delivery
                </h3>

                <p>
                  Pay when your order arrives.
                </p>

              </div>

            </div>

          </section>

        </div>


        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <aside className="checkout-summary">

          <h2>
            Order Summary
          </h2>


          <div className="checkout-products">

            {cart.map((item) => (

              <div
                className="checkout-product"
                key={item._id}
              >

                <img
                  src={item.product?.image}
                  alt={item.product?.name}
                />

                <div>

                  <h3>
                    {item.product?.name}
                  </h3>

                  <p>
                    Qty: {item.quantity}
                  </p>

                </div>

                <strong>
                  ₹
                  {(
                    Number(item.product?.price || 0) *
                    Number(item.quantity || 0)
                  ).toFixed(2)}
                </strong>

              </div>

            ))}

          </div>


          <div className="summary-line">

            <span>
              Items Total
            </span>

            <span>
              ₹{total.toFixed(2)}
            </span>

          </div>


          <div className="summary-line">

            <span>
              Shipping
            </span>

            <span className={shipping === 0 ? "free" : ""}>
              {shipping === 0
                ? "FREE"
                : `₹${shipping.toFixed(2)}`}
            </span>

          </div>


          <div className="summary-line">

            <span>
              Discount
            </span>

            <span className="discount">
              -₹{discount.toFixed(2)}
            </span>

          </div>


          <div className="summary-divider"></div>


          <div className="checkout-total">

            <span>
              Total
            </span>

            <strong>
              ₹{finalTotal.toFixed(2)}
            </strong>

          </div>


          <button
            type="submit"
            className="place-order-btn"
            disabled={loading}
          >
            {loading
              ? "Placing Order..."
              : "Place Order 🎉"}
          </button>


          <p className="secure-checkout">
            🔒 Your information is secure
          </p>

        </aside>

      </form>

    </div>
  );
}

export default Checkout;