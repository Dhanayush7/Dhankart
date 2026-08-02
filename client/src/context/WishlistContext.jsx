import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

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