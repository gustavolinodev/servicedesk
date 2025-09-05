import DashboardLayout from '../../../base-components/DashboardLayout'

export default function AdminPlataformaDashboard() {
  return (
    <DashboardLayout
      showNotifications={true}
      notificationCount={7}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Bem-vindo, Admin da Plataforma!</h1>
          <p className="text-slate-600">Aqui você pode gerenciar clientes, técnicos, configurações globais e visualizar métricas gerais.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Clientes Ativos</h3>
            <p className="text-3xl font-bold text-slate-900">142</p>
            <p className="text-sm text-green-600">+8 este mês</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Técnicos Ativos</h3>
            <p className="text-3xl font-bold text-slate-900">67</p>
            <p className="text-sm text-green-600">Disponíveis</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Tickets do Dia</h3>
            <p className="text-3xl font-bold text-slate-900">89</p>
            <p className="text-sm text-orange-600">45 pendentes</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">SLA Médio</h3>
            <p className="text-3xl font-bold text-slate-900">94%</p>
            <p className="text-sm text-green-600">Meta: 90%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Clientes Recentes</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">TechCorp Ltda</p>
                  <p className="text-sm text-slate-600">Ativado há 2 dias • 25 usuários</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Ativo</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">InnovaSoft Inc</p>
                  <p className="text-sm text-slate-600">Ativado há 1 semana • 15 usuários</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">Trial</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">GlobalTech SA</p>
                  <p className="text-sm text-slate-600">Pendente aprovação • 50 usuários</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">Pendente</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Ações Administrativas</h3>
            <div className="space-y-3">
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">🏢 Gerenciar Clientes</h4>
                <p className="text-sm text-slate-600 mt-1">Ver todos os clientes e seus status</p>
              </button>
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">👥 Gerenciar Técnicos</h4>
                <p className="text-sm text-slate-600 mt-1">Administrar equipe de suporte</p>
              </button>
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">⚙️ Configurações Globais</h4>
                <p className="text-sm text-slate-600 mt-1">Ajustar parâmetros da plataforma</p>
              </button>
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">📊 Relatórios Gerais</h4>
                <p className="text-sm text-slate-600 mt-1">Visualizar métricas consolidadas</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
