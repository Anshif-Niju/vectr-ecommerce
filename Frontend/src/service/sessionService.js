import api from './api';

export const normalizeToken = (token = '') => token.replace(/^Bearer\s+/i, '').trim();

export const storeAuthToken = (token) => {
  const normalizedToken = normalizeToken(token);

  if (!normalizedToken) {
    throw new Error('Authentication token missing');
  }

  localStorage.setItem('token', normalizedToken);
  return normalizedToken;
};

export const clearAuthToken = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = async (token) => {
  const normalizedToken = token ? normalizeToken(token) : localStorage.getItem('token');

  const response = await api.get('/users/me', {
    headers: normalizedToken ? { Authorization: `Bearer ${normalizedToken}` } : undefined,
  });

  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await api.post('/users/login', { email, password });
  const token = storeAuthToken(response.data.jwt_token || '');
  const user = await getCurrentUser(token);

  return { token, user };
};

export const registerUser = async (payload) => {
  const response = await api.post('/users/register', payload);
  return response.data;
};

export const resetPassword = async ({ email, password }) => {
  const response = await api.post('/users/reset-password', { email, password });

  return response.data;
};
