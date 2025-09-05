import type { ReactNode } from 'react'
import Sidebar from './Sidebar'
import TopMenu from './TopMenu'
import styles from './DashboardLayout.module.css'

interface Props {
  children: ReactNode
  sidebarContent?: ReactNode
  showNotifications?: boolean
  notificationCount?: number
  sidebarCollapsed?: boolean
  onMenuClick?: (menuItem: string) => void
  onNotificationClick?: () => void
  onProfileClick?: () => void
  onSettingsClick?: () => void
  onChangePasswordClick?: () => void
  onHelpClick?: () => void
  onSidebarToggle?: (collapsed: boolean) => void
}

export default function DashboardLayout({ 
  children, 
  sidebarContent, 
  showNotifications = true,
  notificationCount = 3,
  sidebarCollapsed = false,
  onMenuClick,
  onNotificationClick,
  onProfileClick,
  onSettingsClick,
  onChangePasswordClick,
  onHelpClick,
  onSidebarToggle
}: Props) {
  
  const handleMenuClick = (menuItem: string) => {
    console.log(`Menu clicked: ${menuItem}`)
    if (onMenuClick) {
      onMenuClick(menuItem)
    }
  }

  return (
    <div className={styles['dashboard-root']}>
      <Sidebar 
        onMenuClick={handleMenuClick}
        collapsed={sidebarCollapsed}
        onToggleCollapse={onSidebarToggle}
      >
        {sidebarContent}
      </Sidebar>

      {/* Main content */}
      <div className={styles['main-content']}>
        <TopMenu 
          showNotifications={showNotifications}
          notificationCount={notificationCount}
          onNotificationClick={onNotificationClick}
          onProfileClick={onProfileClick}
          onSettingsClick={onSettingsClick}
          onChangePasswordClick={onChangePasswordClick}
          onHelpClick={onHelpClick}
        />

        {/* Page content */}
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  )
}