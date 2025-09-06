import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faProjectDiagram,
  faBuilding,
  faDollarSign,
  faTicketAlt,
  faEdit,
  faSpinner,
  faExclamationTriangle,
  faCalendarAlt,
  faChartLine,
  faClock,
  faToggleOn,
  faToggleOff
} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../auth/AuthContext'
import BackButton from '../../base-components/BackButton'
import { 
  getProject, 
  getProjectTickets, 
  getProjectCostReport,
  type Project, 
  type ProjectTicket,
  type ProjectCostReport
} from '../../services/projectService'

interface ProjectDetailsPageProps {
  projectId: number
  onBack: () => void
  onEdit?: (project: Project) => void
}

export default function ProjectDetailsPage({ projectId, onBack, onEdit }: ProjectDetailsPageProps) {
  const { user } = useAuth()
  const [project, setProject] = useState<Project | null>(null)
  const [tickets, setTickets] = useState<ProjectTicket[]>([])
  const [costReport, setCostReport] = useState<ProjectCostReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingTickets, setLoadingTickets] = useState(false)
  const [loadingCostReport, setLoadingCostReport] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'details' | 'tickets' | 'costs'>('details')

  const canEdit = user?.role === 'super_admin' || 
    (user?.role === 'client_admin' && user.company_id === project?.company_id)

  const loadProject = async () => {
    setLoading(true)
    setError(null)
    try {
      const projectData = await getProject(projectId)
      setProject(projectData)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Erro ao carregar detalhes do projeto')
    } finally {
      setLoading(false)
    }
  }

  const loadTickets = async () => {
    if (!project) return
    
    setLoadingTickets(true)
    try {
      const response = await getProjectTickets(project.id, 1, 10)
      setTickets(response.data)
    } catch (err: any) {
      console.error('Erro ao carregar tickets:', err)
    } finally {
      setLoadingTickets(false)
    }
  }

  const loadCostReport = async () => {
    if (!project) return
    
    setLoadingCostReport(true)
    try {
      const report = await getProjectCostReport(project.id)
      setCostReport(report)
    } catch (err: any) {
      console.error('Erro ao carregar relatório de custos:', err)
    } finally {
      setLoadingCostReport(false)
    }
  }

  useEffect(() => {
    loadProject()
  }, [projectId])

  useEffect(() => {
    if (project && activeTab === 'tickets') {
      loadTickets()
    }
  }, [project, activeTab])

  useEffect(() => {
    if (project && activeTab === 'costs') {
      loadCostReport()
    }
  }, [project, activeTab])

  const handleEdit = () => {
    if (project && onEdit) {
      onEdit(project)
    }
  }

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR')
  }

  const getStatusColor = (status: string) => {
    const colors = {
      open: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    }
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <FontAwesomeIcon icon={faSpinner} className="text-blue-500 text-3xl animate-spin" />
          <span className="text-slate-600">Carregando projeto...</span>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <BackButton onClick={onBack} />
          <div className="mt-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
            {error || 'Projeto não encontrado'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <BackButton onClick={onBack} />
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center">
                <FontAwesomeIcon icon={faProjectDiagram} className="mr-3 text-blue-600" />
                {project.name}
              </h1>
              <p className="text-slate-600 mt-2">{project.description}</p>
            </div>
            
            {canEdit && (
              <button
                onClick={handleEdit}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Editar Projeto
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {['details', 'tickets', 'costs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'details' && 'Detalhes'}
                {tab === 'tickets' && 'Tickets'}
                {tab === 'costs' && 'Relatório de Custos'}
              </button>
            ))}
          </nav>
        </div>

        {/* Conteúdo das tabs */}
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Informações principais */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informações básicas */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                  Informações do Projeto
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Nome do Projeto
                    </label>
                    <p className="text-slate-900">{project.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Empresa
                    </label>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faBuilding} className="text-slate-400 mr-2" />
                      <span className="text-slate-900">
                        {project.company?.name || 'Não informado'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Valor por Hora
                    </label>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faDollarSign} className="text-green-500 mr-2" />
                      <span className="text-slate-900 font-semibold">
                        {formatCurrency(project.hourly_rate)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Status
                    </label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      project.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <FontAwesomeIcon 
                        icon={project.is_active ? faToggleOn : faToggleOff} 
                        className="mr-1"
                      />
                      {project.is_active ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Descrição
                  </label>
                  <p className="text-slate-900 whitespace-pre-wrap">{project.description}</p>
                </div>
              </div>

              {/* Informações do sistema */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                  Informações do Sistema
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Criado em
                    </label>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faCalendarAlt} className="text-slate-400 mr-2" />
                      <span className="text-slate-900">{formatDateTime(project.created_at)}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Última atualização
                    </label>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faCalendarAlt} className="text-slate-400 mr-2" />
                      <span className="text-slate-900">{formatDateTime(project.updated_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Estatísticas */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                  Estatísticas
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <FontAwesomeIcon icon={faTicketAlt} className="text-blue-600 text-2xl mb-2" />
                    <p className="text-2xl font-bold text-blue-900">
                      {project.tickets_count || 0}
                    </p>
                    <p className="text-sm text-blue-700">Total de Tickets</p>
                  </div>

                  {project.total_cost && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <FontAwesomeIcon icon={faDollarSign} className="text-green-600 text-2xl mb-2" />
                      <p className="text-xl font-bold text-green-900">
                        {formatCurrency(project.total_cost)}
                      </p>
                      <p className="text-sm text-green-700">Custo Total</p>
                    </div>
                  )}

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                    <FontAwesomeIcon icon={faChartLine} className="text-orange-600 text-2xl mb-2" />
                    <p className="text-xl font-bold text-orange-900">
                      {project.is_active ? 'Em Andamento' : 'Pausado'}
                    </p>
                    <p className="text-sm text-orange-700">Status do Projeto</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">
                Tickets do Projeto
              </h2>
              <p className="text-slate-600 mt-1">
                Lista de todos os tickets associados a este projeto
              </p>
            </div>

            {loadingTickets ? (
              <div className="p-8 text-center">
                <FontAwesomeIcon icon={faSpinner} className="text-blue-500 text-2xl animate-spin mb-2" />
                <p className="text-slate-600">Carregando tickets...</p>
              </div>
            ) : tickets.length === 0 ? (
              <div className="p-8 text-center">
                <FontAwesomeIcon icon={faTicketAlt} className="text-slate-300 text-4xl mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">Nenhum ticket encontrado</h3>
                <p className="text-slate-500">Este projeto ainda não possui tickets cadastrados.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left p-4 font-semibold text-slate-700">Título</th>
                      <th className="text-left p-4 font-semibold text-slate-700">Status</th>
                      <th className="text-left p-4 font-semibold text-slate-700">Prioridade</th>
                      <th className="text-center p-4 font-semibold text-slate-700">Horas</th>
                      <th className="text-left p-4 font-semibold text-slate-700">Criado em</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket) => (
                      <tr key={ticket.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-4">
                          <div>
                            <h4 className="font-medium text-slate-900">{ticket.title}</h4>
                            <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                              {ticket.description}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center">
                            <FontAwesomeIcon icon={faClock} className="text-slate-400 mr-1" />
                            <span>{ticket.hours_worked}h</span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-600">
                          {formatDate(ticket.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'costs' && (
          <div className="space-y-6">
            {loadingCostReport ? (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
                <FontAwesomeIcon icon={faSpinner} className="text-blue-500 text-2xl animate-spin mb-2" />
                <p className="text-slate-600">Carregando relatório de custos...</p>
              </div>
            ) : costReport ? (
              <>
                {/* Resumo dos custos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
                    <FontAwesomeIcon icon={faClock} className="text-blue-600 text-3xl mb-3" />
                    <p className="text-2xl font-bold text-slate-900">{costReport.total_hours}h</p>
                    <p className="text-sm text-slate-600">Total de Horas</p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
                    <FontAwesomeIcon icon={faDollarSign} className="text-green-600 text-3xl mb-3" />
                    <p className="text-2xl font-bold text-slate-900">
                      {formatCurrency(costReport.total_cost)}
                    </p>
                    <p className="text-sm text-slate-600">Custo Total</p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
                    <FontAwesomeIcon icon={faChartLine} className="text-orange-600 text-3xl mb-3" />
                    <p className="text-2xl font-bold text-slate-900">
                      {formatCurrency(project.hourly_rate)}
                    </p>
                    <p className="text-sm text-slate-600">Valor/Hora</p>
                  </div>
                </div>

                {/* Breakdown mensal */}
                {costReport.monthly_breakdown && costReport.monthly_breakdown.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="p-6 border-b border-slate-200">
                      <h3 className="text-lg font-semibold text-slate-800">Breakdown Mensal</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="text-left p-4 font-semibold text-slate-700">Mês</th>
                            <th className="text-center p-4 font-semibold text-slate-700">Horas</th>
                            <th className="text-right p-4 font-semibold text-slate-700">Custo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {costReport.monthly_breakdown.map((month, index) => (
                            <tr key={index} className="border-b border-slate-100">
                              <td className="p-4 font-medium text-slate-900">{month.month}</td>
                              <td className="p-4 text-center text-slate-600">{month.hours}h</td>
                              <td className="p-4 text-right font-semibold text-slate-900">
                                {formatCurrency(month.cost)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
                <FontAwesomeIcon icon={faChartLine} className="text-slate-300 text-4xl mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">Relatório não disponível</h3>
                <p className="text-slate-500">Não foi possível carregar o relatório de custos deste projeto.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
