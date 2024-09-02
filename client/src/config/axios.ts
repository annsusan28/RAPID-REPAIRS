import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 0,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    config.headers['Access-Control-Allow-Origin'] = '*';
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
