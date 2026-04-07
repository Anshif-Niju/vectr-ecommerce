import api from './api';

export const getWishlist = async () => {
  const response = await api.get('/wishlist');
  return response.data;
};

export const addToWishlist = async (productId) => {
  const response = await api.post('/wishlist', { productId });
  return response.data;
};

export const removeFromWishlist = async (wishlistId) => {
  const response = await api.delete(`/wishlist/${wishlistId}`);
  return response.data;
};
