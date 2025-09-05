import DashboardLayout from '../../../base-components/DashboardLayout'

export default function SupportAgentDashboard() {
  return (
    <DashboardLayout
      sidebar={<div className="p-6 font-bold text-emerald-700">Support Agent<br /><nav className="mt-6 flex flex-col gap-2 text-slate-700">
        <a href="#" className="hover:text-emerald-600">Meus Tickets</a>
        <a href="#" className="hover:text-emerald-600">Fila de Atendimento</a>
        <a href="#" className="hover:text-emerald-600">Relatórios</a>
      </nav></div>}
      header={<div className="font-semibold text-lg text-emerald-700">Dashboard - Support Agent</div>}
    >
      <h1 className="text-2xl font-bold text-emerald-700 mb-4">Bem-vindo, agente de suporte!</h1>
      <p>Aqui você vê tickets atribuídos, SLA, fila de atendimento e histórico de ações.</p>
      {/* Adicione cards, lista de tickets, filtros, etc. */}
    </DashboardLayout>
  )
}
