import { useState, type ReactNode } from 'react'
import { useAuth } from '../auth/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faHome, 
  faTicketAlt, 
  faChartBar, 
  faUsers,
  faCog,
  faTools,
  faClipboardList,
  faHeadset,
  faFileAlt,
  faUserCog,
  faDatabase,
  faShieldAlt,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import styles from './DashboardLayout.module.css'

interface SidebarProps {
  children?: ReactNode
  onMenuClick?: (menuItem: string) => void
  collapsed?: boolean
  onToggleCollapse?: (collapsed: boolean) => void
}

interface MenuItemProps {
  icon: any
  label: string
  href?: string
  active?: boolean
  onClick?: () => void
  collapsed?: boolean
  badge?: number
}

// Interface para itens de menu
interface MenuConfig {
  icon: any
  label: string
  key: string
  active?: boolean
  badge?: number
}

function MenuItem({ icon, label, href = "#", active = false, onClick, collapsed = false, badge }: MenuItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <li>
      <a 
        href={href} 
        className={`${styles['sidebar-menu-item']} ${active ? styles.active : ''} ${collapsed ? styles['collapsed'] : ''}`}
        tabIndex={0}
        onClick={handleClick}
        title={collapsed ? label : undefined}
      >
        <FontAwesomeIcon icon={icon} className={styles['sidebar-menu-icon']} />
        {!collapsed && (
          <>
            <span className={styles['sidebar-menu-label']}>{label}</span>
            {badge && badge > 0 && (
              <span className={styles['sidebar-menu-badge']}>{badge > 99 ? '99+' : badge}</span>
            )}
          </>
        )}
      </a>
    </li>
  )
}

// Menus específicos por role
const getMenuByRole = (role: string): MenuConfig[] => {
  const commonItems: MenuConfig[] = [
    { icon: faHome, label: "Dashboard", key: "dashboard", active: true },
  ]

  const roleMenus: Record<string, MenuConfig[]> = {
    'admin': [
      ...commonItems,
      { icon: faUsers, label: "Usuários", key: "users" },
      { icon: faTicketAlt, label: "Tickets", key: "tickets", badge: 12 },
      { icon: faChartBar, label: "Relatórios", key: "reports" },
      { icon: faDatabase, label: "Sistema", key: "system" },
      { icon: faShieldAlt, label: "Segurança", key: "security" },
      { icon: faCog, label: "Configurações", key: "settings" },
    ],
    'support_agent': [
      ...commonItems,
      { icon: faTicketAlt, label: "Meus Tickets", key: "tickets", badge: 8 },
      { icon: faClipboardList, label: "Fila de Tickets", key: "ticket-queue", badge: 23 },
      { icon: faHeadset, label: "Atendimento", key: "support" },
      { icon: faFileAlt, label: "Base Conhecimento", key: "knowledge" },
      { icon: faChartBar, label: "Relatórios", key: "reports" },
    ],
    'support_manager': [
      ...commonItems,
      { icon: faTicketAlt, label: "Todos Tickets", key: "tickets", badge: 45 },
      { icon: faUsers, label: "Equipe", key: "team" },
      { icon: faChartBar, label: "Relatórios", key: "reports" },
      { icon: faTools, label: "Ferramentas", key: "tools" },
      { icon: faUserCog, label: "Configurações", key: "settings" },
    ],
    'client_user': [
      ...commonItems,
      { icon: faTicketAlt, label: "Meus Tickets", key: "tickets", badge: 3 },
      { icon: faFileAlt, label: "Abrir Ticket", key: "new-ticket" },
      { icon: faHeadset, label: "Suporte", key: "support" },
    ],
  }

  return roleMenus[role] || roleMenus['client_user']
}

export default function Sidebar({ children, onMenuClick, collapsed = false, onToggleCollapse }: SidebarProps) {
  const { user } = useAuth()
  const [internalCollapsed, setInternalCollapsed] = useState(collapsed)

  const isCollapsed = onToggleCollapse ? collapsed : internalCollapsed

  const handleMenuClick = (menuItem: string) => {
    if (onMenuClick) {
      onMenuClick(menuItem)
    }
  }

  const handleToggleCollapse = () => {
    const newCollapsed = !isCollapsed
    if (onToggleCollapse) {
      onToggleCollapse(newCollapsed)
    } else {
      setInternalCollapsed(newCollapsed)
    }
  }

  const menuItems = getMenuByRole(user?.role || 'client_user')

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles['sidebar-collapsed'] : ''}`}>
      {/* Header com toggle button */}
      <div className={styles['sidebar-header']}>
        <div className={styles['sidebar-top']}>
          <span className={styles['sidebar-logo']}>SD</span>
          {!isCollapsed && <span className={styles['sidebar-brand']}>ServiceDesk</span>}
        </div>
        
        <button 
          className={styles['sidebar-toggle']}
          onClick={handleToggleCollapse}
          title={isCollapsed ? "Expandir menu" : "Recolher menu"}
        >
          <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className={styles['sidebar-menu']}>
        {children || (
          <ul className={styles['sidebar-menu-list']}>
            {menuItems.map((item) => (
              <MenuItem 
                key={item.key}
                icon={item.icon} 
                label={item.label}
                active={item.active}
                badge={item.badge}
                collapsed={isCollapsed}
                onClick={() => handleMenuClick(item.key)}
              />
            ))}
            
            {/* Separador */}
            <li className={styles['sidebar-menu-separator']}></li>
            
          </ul>
        )}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className={styles['sidebar-footer']}>© 2025 SimplexSoft</div>
      )}
    </aside>
  )
}

export { MenuItem }
