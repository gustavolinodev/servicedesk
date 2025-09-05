import DashboardLayout from '../../../base-components/DashboardLayout'

export default function AdminClienteDashboard() {
  return (
    <DashboardLayout
      showNotifications={true}
      notificationCount={4}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Bem-vindo, Admin do Cliente!</h1>
          <p className="text-slate-600">Aqui você gerencia usuários, vê relatórios, solicitações e configurações do seu contrato.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Usuários Ativos</h3>
            <p className="text-3xl font-bold text-slate-900">32</p>
            <p className="text-sm text-green-600">+2 este mês</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Tickets Abertos</h3>
            <p className="text-3xl font-bold text-slate-900">18</p>
            <p className="text-sm text-orange-600">6 alta prioridade</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Resolvidos</h3>
            <p className="text-3xl font-bold text-slate-900">156</p>
            <p className="text-sm text-green-600">Este mês</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-500 mb-2">Satisfação</h3>
            <p className="text-3xl font-bold text-slate-900">4.5</p>
            <p className="text-sm text-green-600">⭐⭐⭐⭐⭐</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Atividade Recente</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-slate-800">Novo usuário adicionado</p>
                  <p className="text-sm text-slate-600">João Silva foi adicionado ao sistema • há 2 horas</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-slate-800">Ticket resolvido</p>
                  <p className="text-sm text-slate-600">#TK-401 foi marcado como resolvido • há 4 horas</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-slate-800">Configuração atualizada</p>
                  <p className="text-sm text-slate-600">Política de senhas foi modificada • ontem</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Gestão da Conta</h3>
            <div className="space-y-3">
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">👥 Gerenciar Usuários</h4>
                <p className="text-sm text-slate-600 mt-1">Adicionar, editar ou remover usuários</p>
              </button>
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">📊 Relatórios Personalizados</h4>
                <p className="text-sm text-slate-600 mt-1">Gerar relatórios detalhados</p>
              </button>
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">⚙️ Configurações da Conta</h4>
                <p className="text-sm text-slate-600 mt-1">Ajustar preferências e políticas</p>
              </button>
              <button className="w-full p-4 border border-slate-200 rounded-lg hover:bg-slate-50 text-left">
                <h4 className="font-medium text-slate-800">💳 Plano e Faturamento</h4>
                <p className="text-sm text-slate-600 mt-1">Ver detalhes do contrato</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
