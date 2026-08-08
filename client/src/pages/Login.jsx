import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaShoppingBag,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";

import "../css/Auth.css";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        email,
        password,
      });

      login(data.user, data.token);

      toast.success("Welcome back! 🎉");

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT SIDE */}

      <div className="auth-brand">

        <div className="brand-content">

          <div className="brand-logo">
            <FaShoppingBag />
          </div>

          <h1>DhanKart</h1>

          <p>
            Everything you love,
            <br />
            delivered to your doorstep.
          </p>

          <div className="brand-features">

            <span>✓ Premium Products</span>
            <span>✓ Secure Payments</span>
            <span>✓ Fast Delivery</span>

          </div>

        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="auth-container">

        <div className="auth-card">

          <div className="auth-icon">
            🛍️
          </div>

          <h2>
            Welcome Back
          </h2>

          <p className="auth-subtitle">
            Login to continue shopping with DhanKart
          </p>


          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="input-group">

              <FaEnvelope aria-hidden="true" />

              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />

            </div>


            {/* PASSWORD */}

            <div className="input-group">

              <FaLock aria-hidden="true" />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />

            </div>


            {/* LOGIN BUTTON */}

            <button
              className="auth-btn"
              type="submit"
              disabled={loading}
            >

              <FaSignInAlt />

              {loading
                ? "Logging in..."
                : "Login"}

            </button>

          </form>


          {/* FOOTER */}

          <div className="auth-footer">

            <p>
              Don't have an account?
            </p>

            <Link to="/register">
              Create an account
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;