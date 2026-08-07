import API from "./api";

export const addToCart = async (cartData) => {
  const response = await API.post("/cart", cartData);
  return response.data.items;
};

export const getCart = async () => {
  const response = await API.get("/cart");
  return response.data;
};