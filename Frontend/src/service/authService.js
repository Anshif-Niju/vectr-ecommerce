import api from './api';

// ✅ PRODUCTS
export const getHomeProduct = async (query = '') => {
  const response = await api.get(`/products?${query}`);
  return response.data;
};

// ✅ WISHLIST (user from JWT)
export const getUserWishlist = async () => {
  const response = await api.get('/wishlist');
  return response.data;
};
