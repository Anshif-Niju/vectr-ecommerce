import api from './api';

export const createOrder = async (payload) => {
  const response = await api.post('/orders', payload);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get('/orders/my');
  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await api.patch(`/orders/${orderId}/status`, { status });
  return response.data;
};
