import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);
  
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">DhanKart</Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li>
        <li>
  <Link to="/cart">
    Cart ({cart.length})
  </Link>
</li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;