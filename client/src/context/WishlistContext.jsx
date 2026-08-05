import { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await API.get("/wishlist");
        setWishlist(response.data);
      } catch (error) {
        console.error("Failed to load wishlist", error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;