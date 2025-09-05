import { useState } from 'react'
import './Login.css'
import TextField from '../../base-components/TextField'
import Button from '../../base-components/Button'
import { useAuth } from '../../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()

  const [localError, setLocalError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)
    if (!email || !password) {
      setLocalError('Informe e-mail e senha para continuar.')
      return
    }
    await login(email, password)
    // Se login foi bem-sucedido, redireciona
    if (!error) navigate('/dashboard')
  }

  return (
    <div className="login-bg min-h-screen w-full">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10">
        <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <div className="glass gradient-border relative mx-auto max-w-md rounded-2xl border border-slate-200 p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="brand-gradient grid h-10 w-10 place-items-center rounded-lg text-white shadow-lg">
                    <span className="text-lg font-bold">SD</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-slate-900">ServiceDesk</h1>
                    <p className="text-sm text-slate-600">Acesse sua conta para continuar</p>
                  </div>
                </div>
                <span className="hidden rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 md:inline-flex">Seguro · TLS</span>
              </div>

              <form className="space-y-4" onSubmit={onSubmit}>
                <TextField
                  label="E-mail"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M1.5 8.67v8.58A2.25 2.25 0 003.75 19.5h16.5a2.25 2.25 0 002.25-2.25V8.67l-8.708 5.444a3.75 3.75 0 01-3.784 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75A2.25 2.25 0 0020.25 4.5H3.75A2.25 2.25 0 001.5 6.75v.158l9.093 5.686a2.25 2.25 0 002.314 0L22.5 6.908z" />
                    </svg>
                  }
                />
                <TextField
                  label="Senha"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25V9A2.25 2.25 0 004.5 11.25v7.5A2.25 2.25 0 006.75 21h10.5A2.25 2.25 0 0019.5 18.75v-7.5A2.25 2.25 0 0017.25 9V6.75A5.25 5.25 0 0012 1.5zm-3.75 7.5V6.75a3.75 3.75 0 117.5 0V9h-7.5z" clipRule="evenodd" />
                    </svg>
                  }
                />

                {(localError || error) && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {localError || error}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    Lembrar de mim
                  </label>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">Esqueci minha senha</a>
                </div>

                <div className="flex flex-col gap-3">
                  <Button type="submit" disabled={loading} loading={loading} className="w-full">
                    Entrar
                  </Button>
                </div>

                <p className="text-center text-sm text-slate-600">
                  Não tem uma conta? <a href="#" className="font-medium text-blue-600 hover:text-blue-700">Fale com o administrador</a>
                </p>
              </form>
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> 99.9% uptime
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Suporte 24/7
                </span>
                <span className="hidden items-center gap-1 md:inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /> LGPD-ready
                </span>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="mx-auto max-w-xl text-center md:text-left">
              <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
                Atenda com eficiência e empatia
              </h2>
              <p className="text-slate-700">
                Um Service Desk moderno para centralizar solicitações, priorizar demandas e impulsionar a satisfação dos usuários.
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-3 text-left md:grid-cols-2">
                <li className="flex items-center gap-2 text-slate-700"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Tickets inteligentes</li>
                <li className="flex items-center gap-2 text-slate-700"><span className="h-1.5 w-1.5 rounded-full bg-violet-600" /> SLA configurável</li>
                <li className="flex items-center gap-2 text-slate-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-600" /> Relatórios claros</li>
                <li className="flex items-center gap-2 text-slate-700"><span className="h-1.5 w-1.5 rounded-full bg-rose-600" /> Integrações</li>
              </ul>
              <div className="mt-8 flex items-center justify-center gap-6 opacity-80 md:justify-start">
                <div className="text-left">
                  <p className="text-3xl font-extrabold text-slate-900">+2k</p>
                  <p className="text-xs text-slate-600">Tickets/mês</p>
                </div>
                <div className="h-10 w-px bg-slate-300/70" />
                <div className="text-left">
                  <p className="text-3xl font-extrabold text-slate-900">98%</p>
                  <p className="text-xs text-slate-600">Satisfação</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
