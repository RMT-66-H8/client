import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://tukupedia.akbarbudi.xyz/',
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;

