import { useState } from 'react'
import DashboardLayout from '../../../base-components/DashboardLayout'
import CompaniesPage from '../../Companies/CompaniesPage'
import type { Company } from '../../../services/companyService'
import CompanyFormPage from '../../Companies/CompanyFormPage'
import CompanyDetailsPage from '../../Companies/CompanyDetailsPage'

export default function SuperAdminDashboard() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null)

  const handleMenuClick = (menuItem: string) => {
    setCurrentView(menuItem)
    // Reset company selection when changing main menu
    if (menuItem !== 'companies') {
      setSelectedCompany(null)
      setSelectedCompanyId(null)
    }
  }

  const handleCompanyCreate = () => {
    setSelectedCompany(null)
    setCurrentView('company-form')
  }

  const handleCompanyEdit = (company: Company) => {
    setSelectedCompany(company)
    setCurrentView('company-form')
  }

  const handleCompanyView = (company: Company) => {
    setSelectedCompanyId(company.id)
    setCurrentView('company-details')
  }

  const handleBackToCompanies = () => {
    setSelectedCompany(null)
    setSelectedCompanyId(null)
    setCurrentView('companies')
  }

  const handleCompanyFormSuccess = () => {
    setCurrentView('companies')
    setSelectedCompany(null)
  }

  const renderContent = () => {
    switch (currentView) {
      case 'companies':
        return (
          <CompaniesPage 
            onCreateClick={handleCompanyCreate}
            onViewClick={handleCompanyView}
            onEditClick={handleCompanyEdit}
          />
        )
      case 'company-form':
        return (
          <CompanyFormPage 
            company={selectedCompany}
            onBack={handleBackToCompanies}
            onSuccess={handleCompanyFormSuccess}
          />
        )
      case 'company-details':
        return selectedCompanyId ? (
          <CompanyDetailsPage 
            companyId={selectedCompanyId}
            onBack={handleBackToCompanies}
            onEdit={handleCompanyEdit}
          />
        ) : null
      case 'dashboard':
      default:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Bem-vindo, Super Admin!</h1>
              <p className="text-slate-600">Aqui você tem acesso total à plataforma, pode gerenciar tudo e visualizar métricas globais avançadas.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-sm font-medium text-slate-500 mb-2">Total de Usuários</h3>
                <p className="text-3xl font-bold text-slate-900">1,247</p>
                <p className="text-sm text-green-600">+12% este mês</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-sm font-medium text-slate-500 mb-2">Tickets Abertos</h3>
                <p className="text-3xl font-bold text-slate-900">89</p>
                <p className="text-sm text-red-600">+5% esta semana</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentView('companies')}>
                <h3 className="text-sm font-medium text-slate-500 mb-2">Clientes Ativos</h3>
                <p className="text-3xl font-bold text-slate-900">156</p>
                <p className="text-sm text-green-600">+8% este mês</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-sm font-medium text-slate-500 mb-2">Uptime do Sistema</h3>
                <p className="text-3xl font-bold text-slate-900">99.9%</p>
                <p className="text-sm text-green-600">Excelente</p>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <DashboardLayout
      showNotifications={true}
      notificationCount={5}
      activeMenuItem={currentView.includes('company') ? 'companies' : currentView}
      onMenuClick={handleMenuClick}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
