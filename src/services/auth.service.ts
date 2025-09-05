import api from './api'

export async function refreshToken() {
  const response = await api.post('/auth/refresh')
  // Espera { access_token, token_type, expires_in, user }
  return response.data.data
}

export async function logoutApi() {
  return api.post('/auth/logout')
}
