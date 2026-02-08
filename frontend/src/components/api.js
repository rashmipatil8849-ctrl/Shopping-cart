import axios from 'axios';

const api = axios.create({
  baseURL: 'https://shopping-cart-5sp4.onrender.com/api'
});

// attach token automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
