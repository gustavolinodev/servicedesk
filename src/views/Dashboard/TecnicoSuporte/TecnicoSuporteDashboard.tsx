import DashboardLayout from '../../../base-components/DashboardLayout'

export default function TecnicoSuporteDashboard() {
  return (
    <DashboardLayout
      showNotifications={true}
      notificationCount={12}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Bem-vindo, Técnico!</h1>
          <p className="text-slate-600">Aqui você vê tickets atribuídos, SLA, fila de atendimento e histórico de ações.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Tickets Atribuídos</h3>
            <p className="text-3xl font-bold text-slate-900">15</p>
            <p className="text-sm text-orange-600">8 pendentes</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Resolvidos Hoje</h3>
            <p className="text-3xl font-bold text-slate-900">6</p>
            <p className="text-sm text-green-600">Meta: 5</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Tempo Médio</h3>
            <p className="text-3xl font-bold text-slate-900">3.2h</p>
            <p className="text-sm text-green-600">Dentro do SLA</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Avaliação</h3>
            <p className="text-3xl font-bold text-slate-900">4.8</p>
            <p className="text-sm text-green-600">⭐⭐⭐⭐⭐</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Tickets Urgentes</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">#TK-201 - Sistema crítico fora do ar</p>
                  <p className="text-sm text-slate-600">Cliente: TechCorp • SLA: 30min restantes</p>
                </div>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">Crítico</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">#TK-202 - Erro de integração</p>
                  <p className="text-sm text-slate-600">Cliente: InnovaSoft • SLA: 2h restantes</p>
                </div>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">Alto</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">#TK-203 - Performance lenta</p>
                  <p className="text-sm text-slate-600">Cliente: GlobalTech • SLA: 4h restantes</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">Médio</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Ferramentas Técnicas</h3>
            <div className="space-y-3">
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">🔧 Diagnóstico Remoto</h4>
                <p className="text-sm text-slate-600 mt-1">Acessar ferramentas de diagnóstico</p>
              </button>
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">📋 Base de Conhecimento</h4>
                <p className="text-sm text-slate-600 mt-1">Consultar soluções conhecidas</p>
              </button>
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">🎫 Escalar Ticket</h4>
                <p className="text-sm text-slate-600 mt-1">Encaminhar para especialista</p>
              </button>
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">📊 Relatório Técnico</h4>
                <p className="text-sm text-slate-600 mt-1">Gerar relatório de atividades</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
