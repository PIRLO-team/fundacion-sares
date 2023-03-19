// Axios
import axios from 'axios';

const projectApi = axios.create({
  baseURL: 'http://localhost:3001/api',
});

projectApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});

export default projectApi;
