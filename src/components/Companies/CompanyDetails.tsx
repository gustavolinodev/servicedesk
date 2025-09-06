import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faTimes, 
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
import { getCompany, type Company } from '../../services/companyService'

interface CompanyDetailsProps {
  companyId: number
  onClose: () => void
  onEdit?: (company: Company) => void
}

export default function CompanyDetails({ companyId, onClose, onEdit }: CompanyDetailsProps) {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faBuilding} className="text-blue-600 text-xl" />
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Detalhes da Empresa
              </h2>
              {company && (
                <p className="text-sm text-slate-600">{company.name}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {canEdit && company && (
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FontAwesomeIcon icon={faEdit} />
                <span>Editar</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <FontAwesomeIcon icon={faSpinner} className="text-blue-500 text-2xl animate-spin mr-3" />
              <span className="text-slate-600">Carregando detalhes...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
              {error}
            </div>
          ) : company ? (
            <div className="space-y-8">
              {/* Informações básicas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                      <FontAwesomeIcon icon={faBuilding} className="text-blue-600 mr-2" />
                      Informações Básicas
                    </h3>
                    <div className="bg-slate-50 rounded-lg p-4 space-y-4">
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
                      
                      {company.phone && (
                        <div className="flex items-start space-x-3">
                          <FontAwesomeIcon icon={faPhone} className="text-slate-500 mt-1" />
                          <div>
                            <p className="font-medium text-slate-700">Telefone</p>
                            <p className="text-slate-900">{company.phone}</p>
                          </div>
                        </div>
                      )}
                      
                      {company.address && (
                        <div className="flex items-start space-x-3">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-slate-500 mt-1" />
                          <div>
                            <p className="font-medium text-slate-700">Endereço</p>
                            <p className="text-slate-900 whitespace-pre-wrap">{company.address}</p>
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
                </div>

                {/* Estatísticas */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                      <FontAwesomeIcon icon={faProjectDiagram} className="text-green-600 mr-2" />
                      Estatísticas
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <FontAwesomeIcon icon={faUser} className="text-blue-600 text-2xl mb-2" />
                        <p className="text-2xl font-bold text-blue-900">
                          {company.admin ? 1 : 0}
                        </p>
                        <p className="text-sm text-blue-700">Admin</p>
                      </div>

                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                        <FontAwesomeIcon icon={faUsers} className="text-purple-600 text-2xl mb-2" />
                        <p className="text-2xl font-bold text-purple-900">
                          {company.client_users?.length || 0}
                        </p>
                        <p className="text-sm text-purple-700">Usuários</p>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <FontAwesomeIcon icon={faProjectDiagram} className="text-green-600 text-2xl mb-2" />
                        <p className="text-2xl font-bold text-green-900">
                          {company.projects?.length || 0}
                        </p>
                        <p className="text-sm text-green-700">Projetos</p>
                      </div>
                      
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                        <FontAwesomeIcon icon={faTicketAlt} className="text-orange-600 text-2xl mb-2" />
                        <p className="text-2xl font-bold text-orange-900">
                          {company.tickets?.length || 0}
                        </p>
                        <p className="text-sm text-orange-700">Tickets</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Administrador da empresa */}
              {company.admin && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <FontAwesomeIcon icon={faUser} className="text-purple-600 mr-2" />
                    Administrador da Empresa
                  </h3>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{company.admin.name}</p>
                        <p className="text-slate-600">{company.admin.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Informações de sistema */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="font-medium text-slate-700 mb-2">Informações do Sistema</h4>
                <div className="text-sm text-slate-600 space-y-1">
                  <p><strong>Criado em:</strong> {new Date(company.created_at).toLocaleDateString('pt-BR')} às {new Date(company.created_at).toLocaleTimeString('pt-BR')}</p>
                  <p><strong>Última atualização:</strong> {new Date(company.updated_at).toLocaleDateString('pt-BR')} às {new Date(company.updated_at).toLocaleTimeString('pt-BR')}</p>
                </div>
              </div>

              {/* Usuários Cliente */}
              {company.client_users && company.client_users.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <FontAwesomeIcon icon={faUsers} className="text-purple-600 mr-2" />
                    Usuários Cliente ({company.client_users.length})
                  </h3>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {company.client_users.map((user) => (
                        <div key={user.id} className="bg-white rounded-lg p-4 border">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-slate-900">{user.name}</h4>
                              <p className="text-slate-600 text-sm">{user.email}</p>
                              <div className="mt-2 flex items-center space-x-2">
                                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                  {user.role}
                                </span>
                                <span className={`inline-block text-xs px-2 py-1 rounded-full ${
                                  user.is_active 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {user.is_active ? 'Ativo' : 'Inativo'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Projetos */}
              {company.projects && company.projects.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <FontAwesomeIcon icon={faProjectDiagram} className="text-green-600 mr-2" />
                    Projetos ({company.projects.length})
                  </h3>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="space-y-4">
                      {company.projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-lg p-4 border">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-900">{project.name}</h4>
                              <p className="text-slate-600 text-sm mt-1">{project.description}</p>
                              <div className="mt-3 flex items-center space-x-4">
                                <div>
                                  <span className="text-sm font-medium text-slate-700">Valor/hora: </span>
                                  <span className="text-green-600 font-semibold">R$ {project.hourly_rate}</span>
                                </div>
                                <span className={`inline-block text-xs px-2 py-1 rounded-full ${
                                  project.is_active 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {project.is_active ? 'Ativo' : 'Inativo'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Administrador */}
              {company.admin && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <FontAwesomeIcon icon={faUser} className="text-blue-600 mr-2" />
                    Administrador
                  </h3>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-900">{company.admin.name}</h4>
                          <p className="text-slate-600 text-sm">{company.admin.email}</p>
                          <div className="mt-2 flex items-center space-x-2">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {company.admin.role}
                            </span>
                            <span className={`inline-block text-xs px-2 py-1 rounded-full ${
                              company.admin.is_active 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {company.admin.is_active ? 'Ativo' : 'Inativo'}
                            </span>
                          </div>
                          {company.admin.assigned_agent_id && (
                            <div className="mt-2">
                              <span className="text-sm text-slate-600">
                                Agente Responsável ID: {company.admin.assigned_agent_id}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
