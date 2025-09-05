import DashboardLayout from '../../../base-components/DashboardLayout'

export default function SuperAdminDashboard() {
  return (
    <DashboardLayout
      showNotifications={true}
      notificationCount={5}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Bem-vindo, Super Admin!</h1>
          <p className="text-slate-600">Aqui você tem acesso total à plataforma, pode gerenciar tudo e visualizar métricas globais avançadas.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Total de Usuários</h3>
            <p className="text-3xl font-bold text-slate-900">1,247</p>
            <p className="text-sm text-green-600">+12% este mês</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Tickets Abertos</h3>
            <p className="text-3xl font-bold text-slate-900">89</p>
            <p className="text-sm text-red-600">+5% esta semana</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Clientes Ativos</h3>
            <p className="text-3xl font-bold text-slate-900">156</p>
            <p className="text-sm text-green-600">+8% este mês</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Uptime do Sistema</h3>
            <p className="text-3xl font-bold text-slate-900">99.9%</p>
            <p className="text-sm text-green-600">Excelente</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
