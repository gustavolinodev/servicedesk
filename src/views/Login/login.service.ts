import api from '../../services/api'

export async function login(email: string, password: string) {
  // POST /auth/login
  const response = await api.post('/auth/login', { email, password })
  // Espera { success, message, data }
  return response.data.data
}

export async function forgotPassword(email: string) {
  // Exemplo: POST /auth/forgot-password
  const { data } = await api.post('/auth/forgot-password', { email })
  return data
}
