import axios from 'axios';

// Create a configured Axios instance pointing to your Express server
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to dynamically inject JWT token into authorization headers
api.interceptors.request.use(
  (config) => {
    const userStorage = localStorage.getItem('user-storage');
    if (userStorage) {
      try {
        const parsed = JSON.parse(userStorage);
        const token = parsed?.state?.user?.token;
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error parsing token from storage:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;