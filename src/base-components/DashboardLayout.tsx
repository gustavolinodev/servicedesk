import type { ReactNode } from 'react'
import { useAuth } from '../auth/AuthContext'


interface Props {
  children: ReactNode
  sidebar?: ReactNode
  header?: ReactNode
  userInfo?: ReactNode
}


export default function DashboardLayout({ children, sidebar, header, userInfo }: Props) {
  const { user } = useAuth()
  return (
    <div className="flex min-h-screen bg-purple-50">
      {/* Sidebar clara */}
      <aside className="w-72 bg-white border-r border-gray-200 shadow-lg flex-shrink-0 relative z-10">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 px-6 py-7">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 text-white font-bold shadow-lg border-2 border-white/20">SD</span>
            <span className="text-xl font-bold text-purple-700 tracking-wide">ServiceDesk</span>
          </div>
          <nav className="flex-1 px-4 py-4">
            {sidebar || (
              <ul className="flex flex-col gap-2">
                <li><a href="#" className="group flex items-center gap-3 rounded-lg px-4 py-2 text-purple-700 hover:bg-purple-100 transition-all"><span className="h-5 w-5 text-purple-400 group-hover:text-purple-700">🏠</span> Dashboard</a></li>
                <li><a href="#" className="group flex items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-purple-100 transition-all"><span className="h-5 w-5 text-purple-300 group-hover:text-purple-700">📄</span> Tickets</a></li>
                <li><a href="#" className="group flex items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-purple-100 transition-all"><span className="h-5 w-5 text-purple-300 group-hover:text-purple-700">📊</span> Relatórios</a></li>
              </ul>
            )}
          </nav>
          <div className="mt-auto px-6 py-6 text-xs text-gray-400">© 2025 SimplexSoft</div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header claro */}
        <header className="h-20 bg-white border-b border-gray-200 shadow flex items-center px-10 justify-between relative z-10">
          {header || <div className="font-semibold text-2xl text-purple-700 tracking-wide">Dashboard</div>}
          {/* User info (right) */}
          <div className="flex items-center gap-4">
            {userInfo || (
              <div className="flex items-center gap-3 animate-fadeIn">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 text-white font-bold shadow-lg border-2 border-white/20">
                  👤
                </span>
                <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 shadow">{user?.role}</span>
                <span className="font-medium text-purple-700">{user?.name}</span>
                <span className="text-gray-400 text-xs">{user?.email}</span>
              </div>
            )}
          </div>
        </header>
        {/* Page content */}
        <main className="flex-1 p-8 bg-purple-50">
          <div className="rounded-2xl bg-white shadow-xl border border-gray-200 p-8 min-h-[60vh] animate-fadeIn">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}