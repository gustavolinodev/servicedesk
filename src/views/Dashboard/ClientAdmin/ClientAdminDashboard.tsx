import DashboardLayout from '../../../base-components/DashboardLayout'

export default function ClientAdminDashboard() {
  return (
    <DashboardLayout
      showNotifications={true}
      notificationCount={3}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Bem-vindo, Admin do Cliente!</h1>
          <p className="text-slate-600">Aqui você gerencia usuários, vê relatórios, solicitações e configurações do seu contrato.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Usuários da Empresa</h3>
            <p className="text-3xl font-bold text-slate-900">47</p>
            <p className="text-sm text-green-600">+3 este mês</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Tickets Abertos</h3>
            <p className="text-3xl font-bold text-slate-900">12</p>
            <p className="text-sm text-orange-600">Pendentes</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Satisfação</h3>
            <p className="text-3xl font-bold text-slate-900">4.8</p>
            <p className="text-sm text-green-600">⭐⭐⭐⭐⭐</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
              <h4 className="font-medium text-slate-800">Adicionar Usuário</h4>
              <p className="text-sm text-slate-600 mt-1">Criar novo usuário na empresa</p>
            </button>
            <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
              <h4 className="font-medium text-slate-800">Ver Relatórios</h4>
              <p className="text-sm text-slate-600 mt-1">Acessar relatórios detalhados</p>
            </button>
            <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
              <h4 className="font-medium text-slate-800">Configurações</h4>
              <p className="text-sm text-slate-600 mt-1">Gerenciar configurações da conta</p>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
