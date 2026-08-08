import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

import "../css/Navbar.css";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      <div className="nav-container">

        {/* LOGO */}
        <Link to="/" className="logo" onClick={closeMenu}>
          🛍️ Dhan<span>Kart</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/products" onClick={closeMenu}>
              Products
            </Link>
          </li>

          <li>
            <Link to="/products" onClick={closeMenu}>
              Categories
            </Link>
          </li>

          <li>
            <Link to="/" onClick={closeMenu}>
              Contact
            </Link>
          </li>

          {/* MOBILE USER LINKS */}
          {user && (
            <>
              <li className="mobile-user">
                <Link to="/profile" onClick={closeMenu}>
                  👤 Profile
                </Link>
              </li>

              <li className="mobile-user">
                <Link to="/orders" onClick={closeMenu}>
                  📦 My Orders
                </Link>
              </li>
            </>
          )}

          {!user && (
            <>
              <li className="mobile-auth">
                <Link to="/login" onClick={closeMenu}>
                  Login
                </Link>
              </li>

              <li className="mobile-auth">
                <Link to="/register" onClick={closeMenu}>
                  Register
                </Link>
              </li>
            </>
          )}

        </ul>

        {/* SEARCH */}
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search products..."
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="nav-actions">

          <Link to="/wishlist" className="nav-icon">
            <FaHeart />
          </Link>

          <Link to="/cart" className="nav-icon cart-icon">
            <FaShoppingCart />

            {cart.length > 0 && (
              <span className="badge">
                {cart.length}
              </span>
            )}
          </Link>

          {/* USER */}
          {user ? (
            <div className="desktop-user">

              <Link to="/profile" className="user">
                <div className="user-avatar">
                  <FaUser />
                </div>

                <span>{user.name}</span>
              </Link>

              <button
                className="logout-btn"
                onClick={logout}
              >
                Logout
              </button>

            </div>
          ) : (
            <div className="desktop-auth">

              <Link to="/login">
                Login
              </Link>

              <Link to="/register" className="register-btn">
                Register
              </Link>

            </div>
          )}

          {/* HAMBURGER */}
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;