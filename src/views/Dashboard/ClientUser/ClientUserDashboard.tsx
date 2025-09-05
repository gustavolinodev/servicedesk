import DashboardLayout from '../../../base-components/DashboardLayout'

export default function ClientUserDashboard() {
  return (
    <DashboardLayout
      sidebar={<div className="p-6 font-bold text-sky-700">Client User<br /><nav className="mt-6 flex flex-col gap-2 text-slate-700">
        <a href="#" className="hover:text-sky-600">Meus Tickets</a>
        <a href="#" className="hover:text-sky-600">Abrir Ticket</a>
        <a href="#" className="hover:text-sky-600">Histórico</a>
      </nav></div>}
      header={<div className="font-semibold text-lg text-sky-700">Dashboard - Client User</div>}
    >
      <h1 className="text-2xl font-bold text-sky-700 mb-4">Bem-vindo!</h1>
      <p>Aqui você pode abrir novos tickets, acompanhar status, conversar com o suporte e ver histórico de solicitações.</p>
      {/* Adicione cards, lista de tickets, chat, etc. */}
    </DashboardLayout>
  )
}
