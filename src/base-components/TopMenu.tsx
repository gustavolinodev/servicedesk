import { useState, useRef, useEffect, type ReactNode } from 'react'
import { useAuth } from '../auth/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBell, 
  faCog, 
  faSignOutAlt, 
  faChevronDown,
  faUserCircle,
  faKey,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons'
import styles from './DashboardLayout.module.css'

interface TopMenuProps {
  children?: ReactNode
  showNotifications?: boolean
  notificationCount?: number
  onNotificationClick?: () => void
  onProfileClick?: () => void
  onSettingsClick?: () => void
  onChangePasswordClick?: () => void
  onHelpClick?: () => void
}

export default function TopMenu({ 
  children, 
  showNotifications = true,
  notificationCount = 0,
  onNotificationClick,
  onProfileClick,
  onSettingsClick,
  onChangePasswordClick,
  onHelpClick
}: TopMenuProps) {
  const { user, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleUserDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleDropdownAction = (action: () => void) => {
    setIsDropdownOpen(false)
    action()
  }

  const handleLogout = () => {
    setIsDropdownOpen(false)
    logout()
  }

  // Função para pegar iniciais do nome
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className={styles.header}>
      <div className={styles['header-left']}>
        {children}
      </div>

      <div className={styles['header-right']}>
        {/* Área de Notificações */}
        {showNotifications && (
          <div className={styles['notification-area']}>
            <button 
              className={styles['notification-btn']}
              onClick={onNotificationClick}
              title="Notificações"
            >
              <FontAwesomeIcon icon={faBell} />
              {notificationCount > 0 && (
                <span className={styles['notification-badge']}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
            </button>
          </div>
        )}

        {/* User Profile Dropdown */}
        <div className={styles['user-dropdown']} ref={dropdownRef}>
          <button 
            className={styles['user-toggle']}
            onClick={handleUserDropdownToggle}
            aria-expanded={isDropdownOpen}
          >
            <div className={styles['user-avatar']}>
              <span className={styles['user-initials']}>
                {getUserInitials(user?.name || 'User')}
              </span>
            </div>
            <div className={styles['user-info']}>
              <div className={styles['user-name']}>{user?.name || 'Usuário'}</div>
              <div className={styles['user-role']}>{user?.role || 'Cargo'}</div>
            </div>
            <FontAwesomeIcon 
              icon={faChevronDown} 
              className={`${styles['dropdown-arrow']} ${isDropdownOpen ? styles['arrow-up'] : ''}`}
            />
          </button>

          {isDropdownOpen && (
            <div className={styles['user-dropdown-menu']}>
              <div className={styles['dropdown-header']}>
                <div className={styles['dropdown-user-info']}>
                  <div className={styles['dropdown-user-name']}>{user?.name}</div>
                  <div className={styles['dropdown-user-email']}>{user?.email}</div>
                </div>
              </div>
              
              <div className={styles['dropdown-divider']}></div>
              
              <button 
                className={styles['dropdown-item']}
                onClick={() => handleDropdownAction(onProfileClick || (() => {}))}
              >
                <FontAwesomeIcon icon={faUserCircle} />
                Meu Perfil
              </button>
              
              <button 
                className={styles['dropdown-item']}
                onClick={() => handleDropdownAction(onChangePasswordClick || (() => {}))}
              >
                <FontAwesomeIcon icon={faKey} />
                Alterar Senha
              </button>
              
              <button 
                className={styles['dropdown-item']}
                onClick={() => handleDropdownAction(onSettingsClick || (() => {}))}
              >
                <FontAwesomeIcon icon={faCog} />
                Configurações
              </button>
              
              <button 
                className={styles['dropdown-item']}
                onClick={() => handleDropdownAction(onHelpClick || (() => {}))}
              >
                <FontAwesomeIcon icon={faQuestionCircle} />
                Ajuda
              </button>
              
              <div className={styles['dropdown-divider']}></div>
              
              <button 
                className={`${styles['dropdown-item']} ${styles['dropdown-logout']}`}
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
