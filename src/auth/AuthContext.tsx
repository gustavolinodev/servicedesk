import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { login as loginService } from '../views/Login/login.service'
import api from '../services/api'

export type Role = 'super_admin' | 'support_agent' | 'client_admin' | 'client_user'

interface User {
  id: number
  name: string
  email: string
  role: Role
  access_token: string
  token_type: string
  expires_in: number
  company_id?: number | null
  agent_id?: number | null
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Recupera usuário do localStorage se existir
    const saved = localStorage.getItem('user')
    if (saved) {
      const userData: User = JSON.parse(saved)
      setUser(userData)
      api.defaults.headers.common['Authorization'] = `${userData.token_type} ${userData.access_token}`
    }
  }, [])

  async function login(email: string, password: string) {
    setLoading(true)
    setError(null)
    try {
      const data = await loginService(email, password)
      // data: { access_token, token_type, expires_in, user: {...} }
      const userData: User = {
        ...data.user,
        access_token: data.access_token,
        token_type: data.token_type,
        expires_in: data.expires_in,
        company_id: data.user.company_id,
        agent_id: data.user.agent_id,
      }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      // Configura axios para enviar o token em todas as requisições
      api.defaults.headers.common['Authorization'] = `${data.token_type} ${data.access_token}`
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Erro ao autenticar')
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
