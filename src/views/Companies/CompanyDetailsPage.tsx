import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBuilding,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faIdCard,
  faUser,
  faUsers,
  faProjectDiagram,
  faTicketAlt,
  faSpinner,
  faExclamationTriangle,
  faEdit
} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../auth/AuthContext'
import BackButton from '../../base-components/BackButton'
import { getCompany, type Company } from '../../services/companyService'

interface CompanyDetailsPageProps {
  companyId: number
  onBack: () => void
  onEdit?: (company: Company) => void
}

export default function CompanyDetailsPage({ companyId, onBack, onEdit }: CompanyDetailsPageProps) {
  const { user } = useAuth()
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const canEdit = user?.role === 'super_admin' || (user?.role === 'client_admin' && user.company_id === companyId)

  const loadCompany = async () => {
    setLoading(true)
    setError(null)
    try {
      const companyData = await getCompany(companyId)
      setCompany(companyData)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Erro ao carregar detalhes da empresa')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    if (company && onEdit) {
      onEdit(company)
    }
  }

  useEffect(() => {
    loadCompany()
  }, [companyId])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <BackButton onClick={onBack} />
          <h1 className="text-2xl font-bold text-slate-800">Carregando...</h1>
        </div>
        
        <div className="flex justify-center items-center py-12">
          <FontAwesomeIcon icon={faSpinner} className="text-blue-500 text-2xl animate-spin mr-3" />
          <span className="text-slate-600">Carregando detalhes da empresa...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <BackButton onClick={onBack} />
          <h1 className="text-2xl font-bold text-slate-800">Erro</h1>
        </div>
        
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
          {error}
        </div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <BackButton onClick={onBack} />
          <h1 className="text-2xl font-bold text-slate-800">Empresa não encontrada</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <BackButton onClick={onBack} />
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faBuilding} className="text-blue-600 text-2xl" />
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{company.name}</h1>
              <p className="text-slate-600">Detalhes da empresa</p>
            </div>
          </div>
        </div>
        
        {canEdit && (
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FontAwesomeIcon icon={faEdit} />
            <span>Editar</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações básicas */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <FontAwesomeIcon icon={faBuilding} className="text-blue-600 mr-2" />
              Informações Básicas
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FontAwesomeIcon icon={faBuilding} className="text-slate-500 mt-1" />
                  <div>
                    <p className="font-medium text-slate-700">Nome</p>
                    <p className="text-slate-900">{company.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <FontAwesomeIcon icon={faEnvelope} className="text-slate-500 mt-1" />
                  <div>
                    <p className="font-medium text-slate-700">Email</p>
                    <p className="text-slate-900">{company.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <FontAwesomeIcon icon={faIdCard} className="text-slate-500 mt-1" />
                  <div>
                    <p className="font-medium text-slate-700">CNPJ</p>
                    <p className="text-slate-900">{company.cnpj}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {company.phone && (
                  <div className="flex items-start space-x-3">
                    <FontAwesomeIcon icon={faPhone} className="text-slate-500 mt-1" />
                    <div>
                      <p className="font-medium text-slate-700">Telefone</p>
                      <p className="text-slate-900">{company.phone}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    company.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {company.is_active ? 'Ativa' : 'Inativa'}
                  </span>
                </div>
              </div>
            </div>
            
            {company.address && (
              <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="flex items-start space-x-3">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-slate-500 mt-1" />
                  <div>
                    <p className="font-medium text-slate-700">Endereço</p>
                    <p className="text-slate-900 whitespace-pre-wrap">{company.address}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Administrador da empresa */}
          {company.admin && (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <FontAwesomeIcon icon={faUser} className="text-purple-600 mr-2" />
                Administrador da Empresa
              </h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{company.admin.name}</p>
                  <p className="text-slate-600">{company.admin.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Usuários da empresa */}
          {company.clientUsers && company.clientUsers.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <FontAwesomeIcon icon={faUsers} className="text-green-600 mr-2" />
                Usuários da Empresa ({company.clientUsers.length})
              </h3>
              <div className="space-y-3">
                {company.clientUsers.map((clientUser) => (
                  <div key={clientUser.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faUser} className="text-green-600 text-sm" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{clientUser.name}</p>
                      <p className="text-sm text-slate-600">{clientUser.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar com estatísticas */}
        <div className="space-y-6">
          {/* Estatísticas */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <FontAwesomeIcon icon={faProjectDiagram} className="text-green-600 mr-2" />
              Estatísticas
            </h3>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <FontAwesomeIcon icon={faProjectDiagram} className="text-blue-600 text-2xl mb-2" />
                <p className="text-2xl font-bold text-blue-900">
                  {company.projects_count || 0}
                </p>
                <p className="text-sm text-blue-700">Projetos</p>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                <FontAwesomeIcon icon={faTicketAlt} className="text-orange-600 text-2xl mb-2" />
                <p className="text-2xl font-bold text-orange-900">
                  {company.tickets_count || 0}
                </p>
                <p className="text-sm text-orange-700">Tickets</p>
              </div>
            </div>
          </div>

          {/* Informações do sistema */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h4 className="font-medium text-slate-700 mb-3">Informações do Sistema</h4>
            <div className="text-sm text-slate-600 space-y-2">
              <div>
                <p className="font-medium">Criado em:</p>
                <p>{new Date(company.created_at).toLocaleDateString('pt-BR')} às {new Date(company.created_at).toLocaleTimeString('pt-BR')}</p>
              </div>
              <div>
                <p className="font-medium">Última atualização:</p>
                <p>{new Date(company.updated_at).toLocaleDateString('pt-BR')} às {new Date(company.updated_at).toLocaleTimeString('pt-BR')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
