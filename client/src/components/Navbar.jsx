import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";
import "../css/Navbar.css";
import { AuthContext } from "../context/AuthContext";


function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="logo">
        🛍️ <span>DhanKart</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/">Categories</Link></li>
        <li><Link to="/">Contact</Link></li>
        {user ? (
  <>
    <span className="user-name">
      👋 {user.name}
    </span>

    <button
      className="logout-btn"
      onClick={logout}
    >
      Logout
    </button>
  </>
) : (
  <>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </>
)}
      </ul>

      <div className="nav-icons">
        <FaSearch className="icon" />

        <Link to="/wishlist">
          <FaHeart className="icon" />
        </Link>

        <Link to="/cart" className="cart-icon">
          <FaShoppingCart className="icon" />
          <span className="cart-count">{cart.length}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;