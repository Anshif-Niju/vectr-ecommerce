// Frontend/src/service/api.js  ← THIS FILE IS MISSING/BROKEN
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// Frontend/src/service/api.js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Ensure we SEND it with the Bearer prefix
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
