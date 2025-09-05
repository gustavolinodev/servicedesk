import DashboardLayout from '../../../base-components/DashboardLayout'

export default function UsuarioClienteDashboard() {
  return (
    <DashboardLayout
      showNotifications={true}
      notificationCount={3}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Bem-vindo, Usuário!</h1>
          <p className="text-slate-600">Aqui você pode abrir novos tickets, acompanhar status, conversar com o suporte e ver histórico de solicitações.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Meus Tickets</h3>
            <p className="text-3xl font-bold text-slate-900">8</p>
            <p className="text-sm text-orange-600">3 aguardando</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Resolvidos</h3>
            <p className="text-3xl font-bold text-slate-900">24</p>
            <p className="text-sm text-green-600">Este mês</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Satisfação</h3>
            <p className="text-3xl font-bold text-slate-900">4.7</p>
            <p className="text-sm text-green-600">⭐⭐⭐⭐⭐</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Status dos Tickets</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">#TK-301 - Acesso ao sistema</p>
                  <p className="text-sm text-slate-600">Criado há 1 hora</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">Novo</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">#TK-300 - Erro na importação</p>
                  <p className="text-sm text-slate-600">Em andamento há 2 dias</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">Progresso</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">#TK-299 - Lentidão no sistema</p>
                  <p className="text-sm text-slate-600">Aguardando resposta há 1 dia</p>
                </div>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">Aguardando</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Central de Ajuda</h3>
            <div className="space-y-3">
              <button className="w-full p-4 border-2 border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 text-left">
                <h4 className="font-medium text-blue-800">🆘 Abrir Ticket de Suporte</h4>
                <p className="text-sm text-blue-600 mt-1">Reportar um problema ou solicitar ajuda</p>
              </button>
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">💬 Chat em Tempo Real</h4>
                <p className="text-sm text-slate-600 mt-1">Conversar diretamente com suporte</p>
              </button>
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">📖 Documentação</h4>
                <p className="text-sm text-slate-600 mt-1">Consultar guias e tutoriais</p>
              </button>
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">❓ FAQ</h4>
                <p className="text-sm text-slate-600 mt-1">Perguntas frequentes</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
