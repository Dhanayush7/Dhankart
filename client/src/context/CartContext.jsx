import { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to read cart from storage", error);
      return [];
    }
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await API.get("/cart");
        const cartItems = Array.isArray(response.data)
          ? response.data
          : response.data?.items || [];
        setCart(cartItems);
      } catch (error) {
        console.error("Failed to load cart", error);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;