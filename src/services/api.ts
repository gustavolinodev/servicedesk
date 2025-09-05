import axios from 'axios';
import { refreshToken } from './auth.service'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para refresh automático
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const isLoginOrRefresh = originalRequest?.url?.includes('/auth/login') || originalRequest?.url?.includes('/auth/refresh')
    if (error.response?.status === 401 && !originalRequest._retry && !isLoginOrRefresh) {
      originalRequest._retry = true
      try {
        const data = await refreshToken()
        api.defaults.headers.common['Authorization'] = `${data.token_type} ${data.access_token}`
        originalRequest.headers['Authorization'] = `${data.token_type} ${data.access_token}`
        localStorage.setItem('user', JSON.stringify({ ...data.user, ...data }))
        return api(originalRequest)
      } catch (refreshErr) {
        // Se falhar, faz logout
        localStorage.removeItem('user')
        window.location.href = '/login'
        return Promise.reject(refreshErr)
      }
    }
    return Promise.reject(error)
  }
)

export default api;
