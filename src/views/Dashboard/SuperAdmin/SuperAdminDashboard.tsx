import DashboardLayout from '../../../base-components/DashboardLayout'

export default function SuperAdminDashboard() {
  return (
    <DashboardLayout
      sidebar={<div className="p-6 font-bold text-rose-700">Super Admin<br /><nav className="mt-6 flex flex-col gap-2 text-slate-700">
        <a href="#" className="hover:text-rose-600">Visão Geral</a>
        <a href="#" className="hover:text-rose-600">Usuários</a>
        <a href="#" className="hover:text-rose-600">Configurações</a>
      </nav></div>}
      header={<div className="font-semibold text-lg text-rose-700">Dashboard - Super Admin</div>}
    >
      <h1 className="text-2xl font-bold text-rose-700 mb-4">Bem-vindo, Super Admin!</h1>
      <p>Aqui você tem acesso total à plataforma, pode gerenciar tudo e visualizar métricas globais avançadas.</p>
      {/* Adicione cards, gráficos, configurações avançadas, etc. */}
    </DashboardLayout>
  )
}
