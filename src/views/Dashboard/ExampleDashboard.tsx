import { useState } from 'react'
import DashboardLayout from '../../base-components/DashboardLayout'
import { MenuItem } from '../../base-components/Sidebar'
import { faHome, faTicketAlt, faChartBar, faUserCog, faCog } from '@fortawesome/free-solid-svg-icons'

export default function ExampleDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard')

  // Custom sidebar menu
  const customSidebarMenu = (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      <MenuItem 
        icon={faHome} 
        label="Dashboard" 
        active={activeMenu === 'dashboard'}
        onClick={() => setActiveMenu('dashboard')}
      />
      <MenuItem 
        icon={faTicketAlt} 
        label="Tickets"
        active={activeMenu === 'tickets'}
        onClick={() => setActiveMenu('tickets')}
      />
      <MenuItem 
        icon={faChartBar} 
        label="Relatórios"
        active={activeMenu === 'reports'}
        onClick={() => setActiveMenu('reports')}
      />
      <MenuItem 
        icon={faUserCog} 
        label="Usuários"
        active={activeMenu === 'users'}
        onClick={() => setActiveMenu('users')}
      />
      <MenuItem 
        icon={faCog} 
        label="Configurações"
        active={activeMenu === 'settings'}
        onClick={() => setActiveMenu('settings')}
      />
    </ul>
  )

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

  const handleProfileClick = () => {
    console.log('Perfil clicado')
  }

  const handleSettingsClick = () => {
    console.log('Configurações clicadas')
  }

  const handleChangePasswordClick = () => {
    console.log('Alterar senha clicado')
  }

  const handleHelpClick = () => {
    console.log('Ajuda clicada')
  }

  return (
    <DashboardLayout
      title={`Dashboard - ${activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}`}
      sidebarContent={customSidebarMenu}
      showSearch={true}
      showNotifications={true}
      notificationCount={5}
      onMenuClick={handleMenuClick}
      onSearch={handleSearch}
      onNotificationClick={handleNotificationClick}
      onProfileClick={handleProfileClick}
      onSettingsClick={handleSettingsClick}
      onChangePasswordClick={handleChangePasswordClick}
      onHelpClick={handleHelpClick}
    >
      <div style={{ 
        padding: 'var(--spacing-xl)', 
        background: 'var(--surface-primary)', 
        borderRadius: 'var(--border-radius-lg)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h2>Conteúdo do {activeMenu}</h2>
        <p>Este é o conteúdo específico da seção {activeMenu}.</p>
        
        <h3>Funcionalidades dos Componentes Separados:</h3>
        <ul>
          <li><strong>Sidebar:</strong> Menu lateral customizável com função de callback</li>
          <li><strong>TopMenu Minimalista:</strong> Header limpo com dropdown do usuário</li>
          <li><strong>User Dropdown:</strong> Perfil, alterar senha, configurações, ajuda e sair</li>
          <li><strong>Área de Notificações:</strong> Botão com badge e contador inteligente</li>
          <li><strong>DashboardLayout:</strong> Layout principal que integra os componentes</li>
        </ul>

        <h3>Props Disponíveis (TopMenu):</h3>
        <ul>
          <li><code>title</code>: Título do header</li>
          <li><code>showSearch</code>: Mostrar/ocultar barra de busca</li>
          <li><code>showNotifications</code>: Mostrar/ocultar área de notificações</li>
          <li><code>notificationCount</code>: Número de notificações (0 = sem badge)</li>
          <li><code>onSearch</code>: Callback para busca</li>
          <li><code>onNotificationClick</code>: Callback para notificações</li>
          <li><code>onProfileClick</code>: Callback para "Meu Perfil"</li>
          <li><code>onSettingsClick</code>: Callback para "Configurações"</li>
          <li><code>onChangePasswordClick</code>: Callback para "Alterar Senha"</li>
          <li><code>onHelpClick</code>: Callback para "Ajuda"</li>
        </ul>

        <h3>Features do Novo TopMenu:</h3>
        <ul>
          <li>✅ <strong>Design Minimalista:</strong> Layout limpo e profissional</li>
          <li>✅ <strong>Avatar com Iniciais:</strong> Mostra iniciais do usuário automaticamente</li>
          <li>✅ <strong>User Dropdown:</strong> Menu contextual com todas as opções do usuário</li>
          <li>✅ <strong>Notificações Inteligentes:</strong> Badge que mostra "99+" para números altos</li>
          <li>✅ <strong>Click Outside:</strong> Fecha dropdown ao clicar fora</li>
          <li>✅ <strong>Animações Suaves:</strong> Transições CSS elegantes</li>
          <li>✅ <strong>Responsive:</strong> Adapta-se a diferentes tamanhos de tela</li>
        </ul>
      </div>
    </DashboardLayout>
  )
}
