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
        wishlist.map((item) => {
          const product = item.product || item;

          return (
            <div key={item._id || product._id || item.id}>
              <img src={product.image} width="100" />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Wishlist;