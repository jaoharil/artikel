import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test-fe.mysellerpintar.com/api',
  withCredentials: true, // jika pakai cookies/session
});

export default api;
