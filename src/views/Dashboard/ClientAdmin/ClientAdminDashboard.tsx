import DashboardLayout from '../../../base-components/DashboardLayout'

export default function ClientAdminDashboard() {
  return (
    <DashboardLayout
      sidebar={<div className="p-6 font-bold text-violet-700">Client Admin<br /><nav className="mt-6 flex flex-col gap-2 text-slate-700">
        <a href="#" className="hover:text-violet-600">Usuários</a>
        <a href="#" className="hover:text-violet-600">Relatórios</a>
        <a href="#" className="hover:text-violet-600">Configurações</a>
      </nav></div>}
      header={<div className="font-semibold text-lg text-violet-700">Dashboard - Client Admin</div>}
    >
      <h1 className="text-2xl font-bold text-violet-700 mb-4">Bem-vindo, admin do cliente!</h1>
      <p>Aqui você gerencia usuários, vê relatórios, solicitações e configurações do seu contrato.</p>
      {/* Adicione cards, relatórios, ações administrativas */}
    </DashboardLayout>
  )
}
