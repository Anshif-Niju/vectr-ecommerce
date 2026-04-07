import api from './api';

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const updateUser = async (userId, payload) => {
  const response = await api.patch(`/users/${userId}`, payload);
  return response.data;
};
