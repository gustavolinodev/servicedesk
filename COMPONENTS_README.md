# Componentes Separados - Sidebar e TopMenu

## 📁 Estrutura de Componentes

```
src/base-components/
├── DashboardLayout.tsx     # Layout principal integrado
├── Sidebar.tsx            # Menu lateral separado  
├── TopMenu.tsx           # Header/menu superior separado
├── Button.tsx            # Componente de botão
├── DashboardLayout.module.css  # Estilos CSS
└── index.ts              # Exports centralizados
```

## 🚀 Componentes Criados

### **1. Sidebar** (`Sidebar.tsx`)
Menu lateral independente com controle total.

**Props:**
- `children?: ReactNode` - Conteúdo customizado do menu
- `onMenuClick?: (menuItem: string) => void` - Callback para cliques no menu

**Funcionalidades:**
- ✅ Logo e branding automáticos
- ✅ Informações do usuário logado
- ✅ Menu padrão (Dashboard, Tickets, Relatórios, Sair)
- ✅ Suporte a menu customizado
- ✅ Botão de logout integrado
- ✅ Callbacks para cada item do menu

### **2. TopMenu** (`TopMenu.tsx`)
Header superior com funcionalidades avançadas.

**Props:**
- `title?: string` - Título do header (padrão: "Dashboard")
- `children?: ReactNode` - Conteúdo customizado
- `showSearch?: boolean` - Mostrar barra de busca
- `showNotifications?: boolean` - Mostrar botão de notificações
- `onSearch?: (query: string) => void` - Callback para busca
- `onNotificationClick?: () => void` - Callback para notificações
- `onProfileClick?: () => void` - Callback para perfil do usuário
- `onSettingsClick?: () => void` - Callback para configurações

**Funcionalidades:**
- ✅ Barra de busca opcional com ícone
- ✅ Botão de notificações com badge
- ✅ Informações do usuário logado
- ✅ Botão de configurações
- ✅ Botão de logout
- ✅ Layout responsivo
- ✅ Callbacks para todas as ações

### **3. DashboardLayout** (Refatorado)
Layout principal que integra os componentes separados.

**Props:**
- `children: ReactNode` - Conteúdo principal
- `sidebarContent?: ReactNode` - Conteúdo customizado do sidebar
- `title?: string` - Título do header
- `showSearch?: boolean` - Mostrar busca
- `showNotifications?: boolean` - Mostrar notificações
- `onMenuClick?: (menuItem: string) => void` - Callback para menu
- `onSearch?: (query: string) => void` - Callback para busca
- `onNotificationClick?: () => void` - Callback para notificações
- `onProfileClick?: () => void` - Callback para perfil
- `onSettingsClick?: () => void` - Callback para configurações

## 💻 Como Usar

### **Uso Básico**
```tsx
import DashboardLayout from '../base-components/DashboardLayout'

function MyDashboard() {
  return (
    <DashboardLayout>
      <h1>Meu conteúdo aqui</h1>
    </DashboardLayout>
  )
}
```

### **Uso Avançado com Customizações**
```tsx
import { useState } from 'react'
import DashboardLayout from '../base-components/DashboardLayout'
import { MenuItem } from '../base-components/Sidebar'
import { faCustomIcon } from '@fortawesome/free-solid-svg-icons'

function AdvancedDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard')

  // Menu customizado
  const customMenu = (
    <ul>
      <MenuItem 
        icon={faCustomIcon} 
        label="Meu Item" 
        active={activeMenu === 'custom'}
        onClick={() => setActiveMenu('custom')}
      />
    </ul>
  )

  const handleSearch = (query: string) => {
    console.log('Buscar:', query)
  }

  const handleNotification = () => {
    console.log('Notificação clicada')
  }

  return (
    <DashboardLayout
      title="Meu Dashboard Customizado"
      sidebarContent={customMenu}
      showSearch={true}
      showNotifications={true}
      onMenuClick={setActiveMenu}
      onSearch={handleSearch}
      onNotificationClick={handleNotification}
    >
      <div>Conteúdo específico do {activeMenu}</div>
    </DashboardLayout>
  )
}
```

### **Usando Componentes Separadamente**
```tsx
import Sidebar from '../base-components/Sidebar'
import TopMenu from '../base-components/TopMenu'

function CustomLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onMenuClick={(item) => console.log(item)} />
      
      <div style={{ flex: 1 }}>
        <TopMenu 
          title="Meu App"
          showSearch={true}
          onSearch={(query) => console.log(query)}
        />
        <main>Meu conteúdo</main>
      </div>
    </div>
  )
}
```

## 🎨 Estilos CSS

Todos os estilos estão no `DashboardLayout.module.css` com:
- ✅ CSS Variables para design system
- ✅ Paleta de cores profissional
- ✅ Animações suaves
- ✅ Layout responsivo
- ✅ Suporte a hover e focus states
- ✅ Componente de busca estilizado
- ✅ Badge de notificações

## 🔥 Benefícios da Separação

### **Melhor Controle**
- Cada componente tem sua responsabilidade
- Props específicas para cada funcionalidade
- Callbacks dedicados para cada ação

### **Reutilização**
- Sidebar pode ser usado em outros layouts
- TopMenu pode ser customizado por página
- MenuItem pode ser usado independentemente

### **Manutenibilidade**
- Código mais limpo e organizado
- Fácil de modificar componentes específicos
- Testes unitários mais precisos

### **Flexibilidade**
- Menu customizável por role de usuário
- Header dinâmico baseado na página
- Funcionalidades opcionais (busca, notificações)

## 🧪 Exemplo Completo

Veja `ExampleDashboard.tsx` para um exemplo funcional completo mostrando todas as funcionalidades dos novos componentes separados.

---

**🚀 Agora você tem controle total sobre sidebar e top menu!**
