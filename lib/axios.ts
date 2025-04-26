import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test-fe.mysellerpintar.com/api',
  timeout: 5000,
});

// ✅ Gunakan instance `api` di sini juga
export async function fetchArticles(params?: any) {
  const response = await api.get('/articles', { params });
  return response.data;
}

export default api;
