import DashboardLayout from '../../../base-components/DashboardLayout'

export default function SupportAgentDashboard() {
  return (
    <DashboardLayout
      showNotifications={true}
      notificationCount={8}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Bem-vindo, Agente de Suporte!</h1>
          <p className="text-slate-600">Aqui você vê tickets atribuídos, SLA, fila de atendimento e histórico de ações.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Meus Tickets</h3>
            <p className="text-3xl font-bold text-slate-900">23</p>
            <p className="text-sm text-orange-600">12 pendentes</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Resolvidos Hoje</h3>
            <p className="text-3xl font-bold text-slate-900">7</p>
            <p className="text-sm text-green-600">Meta: 8</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Tempo Médio</h3>
            <p className="text-3xl font-bold text-slate-900">2.3h</p>
            <p className="text-sm text-green-600">Dentro do SLA</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Satisfação</h3>
            <p className="text-3xl font-bold text-slate-900">4.6</p>
            <p className="text-sm text-green-600">⭐⭐⭐⭐⭐</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Próximos Tickets</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">#TK-001 - Sistema fora do ar</p>
                  <p className="text-sm text-slate-600">Prioridade: Alta • SLA: 1h restante</p>
                </div>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">Crítico</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">#TK-002 - Login não funciona</p>
                  <p className="text-sm text-slate-600">Prioridade: Média • SLA: 4h restantes</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">Médio</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">#TK-003 - Dúvida sobre recurso</p>
                  <p className="text-sm text-slate-600">Prioridade: Baixa • SLA: 24h restantes</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">Baixo</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">Pegar Próximo Ticket</h4>
                <p className="text-sm text-slate-600 mt-1">Atribuir próximo ticket da fila</p>
              </button>
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">Ver Fila de Atendimento</h4>
                <p className="text-sm text-slate-600 mt-1">Visualizar todos os tickets pendentes</p>
              </button>
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">Relatório de Performance</h4>
                <p className="text-sm text-slate-600 mt-1">Ver métricas de atendimento</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
