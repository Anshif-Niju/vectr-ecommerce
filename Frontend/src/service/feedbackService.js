import api from './api';

export const submitFeedback = async (payload) => {
  const response = await api.post('/feedback', payload);
  return response.data;
};
