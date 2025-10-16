import axios from 'axios';

// Prefer runtime/API_URL; keep sensible fallbacks for local dev
const API_BASE_URL =
  (import.meta && import.meta.env && (import.meta.env.API_URL || import.meta.env.VITE_API_URL)) ||
  (typeof window !== 'undefined' && (window.API_URL || window.__ENV?.API_URL)) ||
  'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

