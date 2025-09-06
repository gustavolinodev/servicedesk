import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faProjectDiagram,
  faPlus,
  faSearch,
  faSpinner,
  faExclamationTriangle,
  faEye,
  faEdit,
  faTrash,
  faBuilding,
  faDollarSign,
  faTicketAlt,
  faToggleOn,
  faToggleOff
} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../auth/AuthContext'
import { notify, confirm } from '../../utils/notifications'
import { 
  getProjects, 
  deleteProject, 
  toggleProjectStatus,
  type Project, 
  type ProjectListResponseData,
  type ProjectStatistics
} from '../../services/projectService'

interface ProjectListProps {
  onCreateProject: () => void
  onEditProject: (project: Project) => void
  onViewProject: (projectId: number) => void
  onStatsUpdate?: (stats: ProjectStatistics) => void
  companyId?: number
  showCompanyFilter?: boolean
}

export default function ProjectList({ 
  onCreateProject, 
  onEditProject, 
  onViewProject,
  onStatsUpdate,
  companyId,
  showCompanyFilter = true
}: ProjectListProps) {
  const { user } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [perPage] = useState(10)
  const [isActiveFilter, setIsActiveFilter] = useState<boolean | undefined>(undefined)
  const [showInactive, setShowInactive] = useState(false)

  const canCreate = user?.role === 'super_admin' || user?.role === 'client_admin'
  const canEdit = user?.role === 'super_admin' || user?.role === 'client_admin'
  const canDelete = user?.role === 'super_admin'
  const canToggleStatus = user?.role === 'super_admin' || user?.role === 'client_admin'

  const loadProjects = async () => {
    setLoading(true)
    setError(null)
    try {
      const response: ProjectListResponseData = await getProjects(
        currentPage, 
        perPage, 
        searchTerm || undefined,
        companyId,
        isActiveFilter,
        showInactive
      )
      
      console.log('API Response:', response)
      console.log('Projects data:', response.projects.data)
      
      setProjects(response.projects.data)
      setTotalPages(response.projects.last_page)
      
      // Passa as estatísticas para o componente pai se houver callback
      if (onStatsUpdate) {
        onStatsUpdate(response.statistics)
      }
    } catch (err: any) {
      console.error('Error loading projects:', err)
      setError(err?.response?.data?.message || 'Erro ao carregar projetos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [currentPage, searchTerm, companyId, isActiveFilter])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    loadProjects()
  }

  const handleDelete = async (project: Project) => {
    if (!canDelete) {
      notify.warning('Você não tem permissão para excluir projetos')
      return
    }

    const confirmed = await confirm.delete(`o projeto "${project.name}"`)
    if (confirmed) {
      try {
        await deleteProject(project.id)
        notify.success('Projeto excluído com sucesso!')
        loadProjects()
      } catch (error) {
        notify.error('Erro ao excluir projeto')
      }
    }
  }

  const handleToggleStatus = async (project: Project) => {
    if (!canToggleStatus) {
      notify.warning('Você não tem permissão para alterar status do projeto')
      return
    }

    const action = project.is_active ? 'desativar' : 'ativar'
    const confirmed = await confirm.action(
      `${action.charAt(0).toUpperCase() + action.slice(1)} projeto?`,
      `Deseja ${action} o projeto "${project.name}"?`
    )

    if (confirmed) {
      try {
        await toggleProjectStatus(project.id)
        notify.success(`Projeto ${action === 'ativar' ? 'ativado' : 'desativado'} com sucesso!`)
        loadProjects()
      } catch (error) {
        notify.error(`Erro ao ${action} projeto`)
      }
    }
  }

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(parseFloat(value))
  }

  if (loading && projects.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <FontAwesomeIcon icon={faSpinner} className="text-blue-500 text-2xl animate-spin mr-3" />
        <span className="text-slate-600">Carregando projetos...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <FontAwesomeIcon icon={faProjectDiagram} className="mr-3 text-blue-600" />
            Projetos
            {companyId && projects.length > 0 && projects[0].company && (
              <span className="ml-2 text-lg font-normal text-slate-600">
                - {projects[0].company.name}
              </span>
            )}
          </h2>
          <p className="text-slate-600 mt-1">
            {projects.length > 0 ? `${projects.length} projeto(s) encontrado(s)` : 'Nenhum projeto encontrado'}
          </p>
        </div>

        {canCreate && (
          <button
            onClick={onCreateProject}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Novo Projeto
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" 
              />
              <input
                type="text"
                placeholder="Buscar projetos por nome ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <select
              value={isActiveFilter === undefined ? '' : isActiveFilter.toString()}
              onChange={(e) => setIsActiveFilter(e.target.value === '' ? undefined : e.target.value === 'true')}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos</option>
              <option value="true">Ativos</option>
              <option value="false">Inativos</option>
            </select>

            <label className="flex items-center space-x-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={showInactive}
                onChange={(e) => setShowInactive(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
              />
              <span>Incluir inativos</span>
            </label>

            <button
              type="submit"
              className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </form>
      </div>

      {/* Lista de projetos */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        {projects.length === 0 ? (
          <div className="p-8 text-center">
            <FontAwesomeIcon icon={faProjectDiagram} className="text-slate-300 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">Nenhum projeto encontrado</h3>
            <p className="text-slate-500">
              {canCreate ? 'Clique em "Novo Projeto" para criar o primeiro projeto.' : 'Não há projetos disponíveis.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-700">Projeto</th>
                  {showCompanyFilter && <th className="text-left p-4 font-semibold text-slate-700">Empresa</th>}
                  <th className="text-left p-4 font-semibold text-slate-700">Valor/Hora</th>
                  <th className="text-center p-4 font-semibold text-slate-700">Tickets</th>
                  <th className="text-center p-4 font-semibold text-slate-700">Status</th>
                  <th className="text-center p-4 font-semibold text-slate-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(projects) ? projects.map((project) => (
                  <tr key={project.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4">
                      <div>
                        <h4 className="font-semibold text-slate-900">{project.name}</h4>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{project.description}</p>
                        <p className="text-xs text-slate-500 mt-2">
                          Criado em {new Date(project.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </td>

                    {showCompanyFilter && (
                      <td className="p-4">
                        {project.company && (
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faBuilding} className="text-slate-400 mr-2" />
                            <span className="text-sm text-slate-600">{project.company.name}</span>
                          </div>
                        )}
                      </td>
                    )}

                    <td className="p-4">
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faDollarSign} className="text-green-500 mr-2" />
                        <span className="font-semibold text-slate-900">
                          {formatCurrency(project.hourly_rate)}
                        </span>
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <FontAwesomeIcon icon={faTicketAlt} className="text-orange-500 mr-2" />
                        <span className="font-semibold text-slate-900">
                          {project.tickets_count || 0}
                        </span>
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(project)}
                        disabled={!canToggleStatus}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          project.is_active
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        } ${!canToggleStatus ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <FontAwesomeIcon 
                          icon={project.is_active ? faToggleOn : faToggleOff} 
                          className="mr-1"
                        />
                        {project.is_active ? 'Ativo' : 'Inativo'}
                      </button>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => onViewProject(project.id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                          title="Ver detalhes"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>

                        {canEdit && (
                          <button
                            onClick={() => onEditProject(project)}
                            className="text-green-600 hover:text-green-800 transition-colors p-1"
                            title="Editar"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        )}

                        {canDelete && (
                          <button
                            onClick={() => handleDelete(project)}
                            className="text-red-600 hover:text-red-800 transition-colors p-1"
                            title="Excluir"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      Nenhum projeto encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Página {currentPage} de {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || loading}
                className="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || loading}
                className="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próximo
              </button>
            </div>
          </div>
        )}
      </div>

      {loading && projects.length > 0 && (
        <div className="text-center py-2">
          <FontAwesomeIcon icon={faSpinner} className="text-blue-500 animate-spin mr-2" />
          <span className="text-slate-600">Atualizando...</span>
        </div>
      )}
    </div>
  )
}
