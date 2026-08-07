import API from "./api";

export const getProfile = async (id) => {
  const res = await API.get(`/profile/${id}`);
  return res.data;
};

export const updateProfile = async (id, data) => {
  const res = await API.put(`/profile/${id}`, data);
  return res.data;
};