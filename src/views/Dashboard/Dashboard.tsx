import AdminPlataformaDashboard from './AdminPlataforma/AdminPlataformaDashboard'
import TecnicoSuporteDashboard from './TecnicoSuporte/TecnicoSuporteDashboard'
import AdminClienteDashboard from './AdminCliente/AdminClienteDashboard'
import SuperAdminDashboard from './SuperAdmin/SuperAdminDashboard'
import SupportAgentDashboard from './SupportAgent/SupportAgentDashboard'
import ClientAdminDashboard from './ClientAdmin/ClientAdminDashboard'
import ClientUserDashboard from './ClientUser/ClientUserDashboard'

export type Role = 'super_admin' | 'support_agent' | 'client_admin' | 'client_user'

interface Props {
  role: Role
}

export default function Dashboard({ role }: Props) {
  switch (role) {
    case 'super_admin':
      return <SuperAdminDashboard />
    case 'support_agent':
      return <SupportAgentDashboard />
    case 'client_admin':
      return <ClientAdminDashboard />
    case 'client_user':
    default:
      return <ClientUserDashboard />
  }
}
