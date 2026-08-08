import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import { registerUser } from "../services/authService";
import "../css/Auth.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      toast.error("Please fill all fields.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      await registerUser(formData);
      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🛍️</div>
          <h1>Create Account</h1>
          <p>Join DhanKart and start shopping today</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser aria-hidden="true" />
            <input type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} autoComplete="name" required />
          </div>
          <div className="input-group">
            <FaEnvelope aria-hidden="true" />
            <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} autoComplete="email" required />
          </div>
          <div className="input-group">
            <FaLock aria-hidden="true" />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} autoComplete="new-password" minLength="6" required />
          </div>
          <button className="auth-btn" type="submit" disabled={loading}>
            <FaUserPlus /> {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account?</p>
          <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
