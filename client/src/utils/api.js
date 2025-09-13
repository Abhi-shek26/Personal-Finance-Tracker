import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

api.interceptors.request.use(config => {
    const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    if (user?.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
  }
    return config;
});

export default api;
