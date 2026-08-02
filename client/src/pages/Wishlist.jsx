import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

function Wishlist() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Wishlist</h1>

      {wishlist.length === 0 ? (
        <h2>No items in wishlist.</h2>
      ) : (
        wishlist.map((item) => (
          <div key={item.id}>
            <img src={item.image} width="100" />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;