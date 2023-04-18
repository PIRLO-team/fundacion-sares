// Axios
import axios from 'axios';

const projectApi = axios.create({
  baseURL: 'http://fundacion-sares-dev-51ab.up.railway.app/',
});

projectApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('Authorization');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

export default projectApi;
