import DashboardLayout from '../../../base-components/DashboardLayout'

export default function ClientUserDashboard() {
  return (
    <DashboardLayout
      showNotifications={true}
      notificationCount={2}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Bem-vindo!</h1>
          <p className="text-slate-600">Aqui você pode abrir novos tickets, acompanhar status, conversar com o suporte e ver histórico de solicitações.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Meus Tickets</h3>
            <p className="text-3xl font-bold text-slate-900">5</p>
            <p className="text-sm text-orange-600">2 em andamento</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Resolvidos</h3>
            <p className="text-3xl font-bold text-slate-900">18</p>
            <p className="text-sm text-green-600">Este mês</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Tempo Médio</h3>
            <p className="text-3xl font-bold text-slate-900">1.2 dias</p>
            <p className="text-sm text-green-600">De resolução</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Tickets Recentes</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">#TK-105 - Problema no sistema</p>
                  <p className="text-sm text-slate-600">Criado há 2 dias</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Resolvido</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">#TK-106 - Dúvida sobre faturamento</p>
                  <p className="text-sm text-slate-600">Criado há 1 dia</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">Em andamento</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">#TK-107 - Solicitação de acesso</p>
                  <p className="text-sm text-slate-600">Criado há 3 horas</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">Novo</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <button className="w-full p-4 border-2 border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 text-left">
                <h4 className="font-medium text-blue-800">🎫 Abrir Novo Ticket</h4>
                <p className="text-sm text-blue-600 mt-1">Criar nova solicitação de suporte</p>
              </button>
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">📋 Ver Todos os Tickets</h4>
                <p className="text-sm text-slate-600 mt-1">Visualizar histórico completo</p>
              </button>
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">💬 Chat com Suporte</h4>
                <p className="text-sm text-slate-600 mt-1">Conversar em tempo real</p>
              </button>
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">📚 Base de Conhecimento</h4>
                <p className="text-sm text-slate-600 mt-1">Buscar artigos de ajuda</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
