import { useState } from 'react'
import DashboardLayout from '../../base-components/DashboardLayout'

// Simulação de diferentes tipos de usuário
const userTypes = {
  admin: {
    name: "João Silva",
    email: "joao.silva@empresa.com",
    role: "admin"
  },
  support_agent: {
    name: "Maria Santos",
    email: "maria.santos@empresa.com", 
    role: "support_agent"
  },
  support_manager: {
    name: "Carlos Lima",
    email: "carlos.lima@empresa.com",
    role: "support_manager"
  },
  client_user: {
    name: "Ana Costa",
    email: "ana.costa@cliente.com",
    role: "client_user"
  }
}

export default function SidebarDemo() {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [currentUserType, setCurrentUserType] = useState<keyof typeof userTypes>('admin')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleMenuClick = (menuItem: string) => {
    console.log(`Menu clicado: ${menuItem}`)
    setActiveMenu(menuItem)
  }

  const handleSearch = (query: string) => {
    console.log(`Busca realizada: ${query}`)
  }

  const handleNotificationClick = () => {
    console.log('Notificações clicadas')
  }

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed)
    console.log(`Sidebar ${collapsed ? 'colapsado' : 'expandido'}`)
  }

  const currentUser = userTypes[currentUserType]

  // Simular login com diferentes usuários
  const handleUserChange = (userType: keyof typeof userTypes) => {
    setCurrentUserType(userType)
    // Simular mudança no AuthContext
    console.log(`Simulando login como: ${userTypes[userType].name} (${userTypes[userType].role})`)
  }

  return (
    <div>
      {/* Seletor de tipo de usuário para demo */}
      <div style={{ 
        position: 'fixed', 
        top: '10px', 
        right: '10px', 
        background: 'white', 
        padding: '10px', 
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 9999,
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ fontSize: '0.75rem', marginBottom: '8px', fontWeight: '600', color: '#64748b' }}>
          🎭 Simulador de Usuário
        </div>
        <select 
          value={currentUserType} 
          onChange={(e) => handleUserChange(e.target.value as keyof typeof userTypes)}
          style={{ 
            padding: '4px 8px', 
            borderRadius: '4px', 
            border: '1px solid #d1d5db',
            fontSize: '0.75rem',
            width: '100%'
          }}
        >
          <option value="admin">👑 Admin</option>
          <option value="support_agent">🎧 Agente de Suporte</option>
          <option value="support_manager">👨‍💼 Gerente de Suporte</option>
          <option value="client_user">👤 Cliente</option>
        </select>
        
        <div style={{ 
          marginTop: '8px', 
          fontSize: '0.7rem', 
          color: '#6b7280',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            background: sidebarCollapsed ? '#ef4444' : '#10b981' 
          }}></span>
          Sidebar: {sidebarCollapsed ? 'Colapsado' : 'Expandido'}
        </div>
      </div>

      <DashboardLayout
        title={`Dashboard ${currentUser.role === 'admin' ? '(Admin)' : currentUser.role === 'support_agent' ? '(Agente)' : currentUser.role === 'support_manager' ? '(Gerente)' : '(Cliente)'}`}
        showSearch={true}
        showNotifications={true}
        notificationCount={currentUser.role === 'admin' ? 12 : currentUser.role === 'support_agent' ? 23 : currentUser.role === 'support_manager' ? 45 : 3}
        sidebarCollapsed={sidebarCollapsed}
        onMenuClick={handleMenuClick}
        onSearch={handleSearch}
        onNotificationClick={handleNotificationClick}
        onSidebarToggle={handleSidebarToggle}
      >
        <div style={{ 
          padding: 'var(--spacing-xl)', 
          background: 'var(--surface-primary)', 
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2>🎯 Demo do Sidebar Inteligente</h2>
          
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3>👤 Usuário Atual:</h3>
            <div style={{ 
              background: 'var(--primary-50)', 
              padding: 'var(--spacing-md)', 
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--primary-200)'
            }}>
              <div><strong>Nome:</strong> {currentUser.name}</div>
              <div><strong>Email:</strong> {currentUser.email}</div>
              <div><strong>Role:</strong> {currentUser.role}</div>
            </div>
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3>🎮 Seção Ativa:</h3>
            <div style={{ 
              background: 'var(--accent-50)', 
              padding: 'var(--spacing-md)', 
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--accent-200)',
              color: 'var(--accent-700)'
            }}>
              <strong>📍 {activeMenu}</strong>
            </div>
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3>🏗️ Funcionalidades do Sidebar:</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>✅ <strong>Menus específicos por role:</strong> Cada tipo de usuário vê opções relevantes</li>
              <li>✅ <strong>Colapsar/Expandir:</strong> Botão de toggle para economizar espaço</li>
              <li>✅ <strong>Badges dinâmicos:</strong> Contadores de tickets/notificações por role</li>
              <li>✅ <strong>Design limpo:</strong> Sem duplicação de informações do usuário</li>
              <li>✅ <strong>Tooltips:</strong> Mostram labels quando colapsado</li>
              <li>✅ <strong>Transições suaves:</strong> Animações CSS elegantes</li>
              <li>✅ <strong>Item ativo melhorado:</strong> Visual mais robusto quando colapsado</li>
            </ul>
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3>📋 Menus por Tipo de Usuário:</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-md)' }}>
              <div style={{ background: 'var(--surface-secondary)', padding: 'var(--spacing-md)', borderRadius: 'var(--border-radius-md)' }}>
                <h4 style={{ color: 'var(--error)' }}>👑 Admin</h4>
                <ul style={{ fontSize: '0.875rem', paddingLeft: '1rem' }}>
                  <li>Dashboard</li>
                  <li>Usuários</li>
                  <li>Tickets (12)</li>
                  <li>Relatórios</li>
                  <li>Sistema</li>
                  <li>Segurança</li>
                  <li>Configurações</li>
                </ul>
              </div>

              <div style={{ background: 'var(--surface-secondary)', padding: 'var(--spacing-md)', borderRadius: 'var(--border-radius-md)' }}>
                <h4 style={{ color: 'var(--accent-600)' }}>🎧 Agente de Suporte</h4>
                <ul style={{ fontSize: '0.875rem', paddingLeft: '1rem' }}>
                  <li>Dashboard</li>
                  <li>Meus Tickets (8)</li>
                  <li>Fila de Tickets (23)</li>
                  <li>Atendimento</li>
                  <li>Base Conhecimento</li>
                  <li>Relatórios</li>
                </ul>
              </div>

              <div style={{ background: 'var(--surface-secondary)', padding: 'var(--spacing-md)', borderRadius: 'var(--border-radius-md)' }}>
                <h4 style={{ color: 'var(--warning)' }}>👨‍💼 Gerente de Suporte</h4>
                <ul style={{ fontSize: '0.875rem', paddingLeft: '1rem' }}>
                  <li>Dashboard</li>
                  <li>Todos Tickets (45)</li>
                  <li>Equipe</li>
                  <li>Relatórios</li>
                  <li>Ferramentas</li>
                  <li>Configurações</li>
                </ul>
              </div>

              <div style={{ background: 'var(--surface-secondary)', padding: 'var(--spacing-md)', borderRadius: 'var(--border-radius-md)' }}>
                <h4 style={{ color: 'var(--success)' }}>👤 Cliente</h4>
                <ul style={{ fontSize: '0.875rem', paddingLeft: '1rem' }}>
                  <li>Dashboard</li>
                  <li>Meus Tickets (3)</li>
                  <li>Abrir Ticket</li>
                  <li>Suporte</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ 
            background: 'var(--primary-50)', 
            padding: 'var(--spacing-lg)', 
            borderRadius: 'var(--border-radius-lg)',
            border: '2px dashed var(--primary-300)'
          }}>
            <h3>🧪 Como Testar:</h3>
            <ol style={{ paddingLeft: '1.5rem' }}>
              <li>Use o <strong>seletor no canto superior direito</strong> para alternar entre tipos de usuário</li>
              <li>Clique no <strong>botão de toggle</strong> (←/→) no header do sidebar para colapsar</li>
              <li>Observe como <strong>cada role tem menus específicos</strong> e badges diferentes</li>
              <li>Passe o mouse sobre os itens colapsados para ver os <strong>tooltips</strong></li>
              <li>Note o <strong>visual melhorado</strong> do item ativo quando colapsado</li>
              <li>Informações do usuário estão apenas no <strong>TopMenu</strong> (sem duplicação)</li>
            </ol>
          </div>
        </div>
      </DashboardLayout>
    </div>
  )
}
