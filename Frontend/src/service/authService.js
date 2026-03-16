import api from './api';

export const getUserByEmail = async (email) => {
  const response = await api.get(`/users?email=${email}`);
  return response.data;
};

export const getHomeProduct = async (limit) => {
  const response = await api.get(`/products?_${limit}`);
  return response.data;
};

export const getUserProduct = async (id) => {
  const response = await api.get(`/wishlist?userId=${id}`);
  return response.data;
};
