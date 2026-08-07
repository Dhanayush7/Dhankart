import { Routes, Route } from "react-router-dom";
import OrderSuccess from "./pages/OrderSuccess";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from "./pages/Orders";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProducts";
import AdminOrders from "./pages/AdminOrders";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route
  path="/order-success"
  element={
    <ProtectedRoute>
      <OrderSuccess />
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/products"
  element={
    <ProtectedRoute>
      <AdminProducts />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/add-product"
  element={
    <ProtectedRoute>
      <AddProduct />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/orders"
  element={
    <ProtectedRoute>
      <AdminOrders />
    </ProtectedRoute>
  }
/>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>
        {/* Protected Routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;