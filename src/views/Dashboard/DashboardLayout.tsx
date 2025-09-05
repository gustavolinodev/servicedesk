import type { ReactNode } from 'react'
import { useAuth } from '../../auth/AuthContext'

interface Props {
  children: ReactNode
  sidebar?: ReactNode
  header?: ReactNode
  userInfo?: ReactNode
}

export default function DashboardLayout({ children, sidebar, header, userInfo }: Props) {
  const { user } = useAuth()
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 shadow-sm flex-shrink-0">
        {sidebar || <div className="p-6 font-bold text-blue-700">ServiceDesk</div>}
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between">
          {header || <div className="font-semibold text-lg text-slate-700">Dashboard</div>}
          {/* User info (right) */}
          <div className="flex items-center gap-3">
            {userInfo || (
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">{user?.role}</span>
                <span className="font-medium text-slate-700">{user?.name}</span>
                <span className="text-slate-500 text-xs">{user?.email}</span>
              </div>
            )}
          </div>
        </header>
        {/* Page content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
