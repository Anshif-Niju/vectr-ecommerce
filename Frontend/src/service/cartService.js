import api from './api';

export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const addToCart = async ({ productId, quantity }) => {
  const response = await api.post('/cart', { productId, quantity });
  return response.data;
};

export const removeFromCart = async (cartId) => {
  const response = await api.delete(`/cart/${cartId}`);
  return response.data;
};

export const clearCartItems = async () => {
  const response = await api.delete('/cart/clear');
  return response.data;
};
