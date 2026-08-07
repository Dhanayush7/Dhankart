import API from "./api";

export const placeOrder = async (orderData) => {
  const response = await API.post(
    "/orders",
    orderData
  );

  return response.data;
};

export const getOrders = async (userId) => {
  const response = await API.get(
    `/orders/${userId}`
  );

  return response.data;
};