import API from "./api";

export const getWishlist = async () => {
  const response = await API.get("/wishlist");
  return response.data;
};

export const addToWishlist = async (wishlistData) => {
  const response = await API.post("/wishlist", wishlistData);
  return response.data;
};

export const removeFromWishlist = async (wishlistItemId) => {
  const response = await API.post("/wishlist/remove", {
    wishlistItemId,
  });

  return response.data;
};