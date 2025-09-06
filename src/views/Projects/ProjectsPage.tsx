import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faProjectDiagram, 
  faPlus,
  faList,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../auth/AuthContext'
import ProjectList from '../../components/Projects/ProjectList'
import ProjectFormPage from './ProjectFormPage'
import ProjectDetailsPage from './ProjectDetailsPage'
import { type Project, type ProjectStatistics } from '../../services/projectService'

type ViewMode = 'list' | 'form' | 'details'

export default function ProjectsPage() {
  const { user } = useAuth()
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [statistics, setStatistics] = useState<ProjectStatistics>({
    total_projects: 0,
    active_projects: 0,
    inactive_projects: 0,
    total_tickets: 0,
    avg_hourly_rate: 0
  })

  const canCreateProject = user?.role === 'super_admin' || user?.role === 'client_admin'

  const handleCreateProject = () => {
    setSelectedProject(null)
    setViewMode('form')
  }

  const handleEditProject = (project: Project) => {
    setSelectedProject(project)
    setViewMode('form')
  }

  const handleViewProject = (projectId: number) => {
    // Para simplificar, vamos buscar o projeto da lista
    // Em uma implementação real, você poderia fazer uma nova consulta à API
    setSelectedProject({ id: projectId } as Project)
    setViewMode('details')
  }

  const handleBackToList = () => {
    setSelectedProject(null)
    setViewMode('list')
    // Trigger refresh da lista para refletir mudanças
    setRefreshTrigger(prev => prev + 1)
  }

  const handleProjectSaved = (project: Project) => {
    setSelectedProject(project)
    setViewMode('details')
    // Trigger refresh da lista
    setRefreshTrigger(prev => prev + 1)
  }

  const handleStatsUpdate = (stats: ProjectStatistics) => {
    setStatistics(stats)
  }

  if (viewMode === 'form') {
    return (
      <ProjectFormPage
        project={selectedProject}
        onBack={handleBackToList}
        onSuccess={handleProjectSaved}
        companyId={user?.role !== 'super_admin' ? (user?.company_id || undefined) : undefined}
      />
    )
  }

  if (viewMode === 'details' && selectedProject) {
    return (
      <ProjectDetailsPage
        projectId={selectedProject.id}
        onBack={handleBackToList}
        onEdit={handleEditProject}
      />
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center">
                <FontAwesomeIcon icon={faProjectDiagram} className="mr-3 text-blue-600" />
                Projetos
              </h1>
              <p className="text-slate-600 mt-2">
                Gerencie os projetos da sua {user?.role === 'super_admin' ? 'plataforma' : 'empresa'}
              </p>
            </div>

            {canCreateProject && (
              <button
                onClick={handleCreateProject}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Novo Projeto
              </button>
            )}
          </div>

          {/* Navigation breadcrumb */}
          <nav className="mt-4">
            <ol className="flex items-center space-x-2 text-sm text-slate-500">
              <li>Dashboard</li>
              <li>/</li>
              <li className="text-slate-900 font-medium">Projetos</li>
            </ol>
          </nav>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total de Projetos</p>
                <p className="text-2xl font-semibold text-slate-900">{statistics.total_projects}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faProjectDiagram} className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Projetos Ativos</p>
                <p className="text-2xl font-semibold text-green-600">{statistics.active_projects}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faList} className="text-green-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Projetos Inativos</p>
                <p className="text-2xl font-semibold text-orange-600">{statistics.inactive_projects}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faArrowLeft} className="text-orange-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Lista de projetos */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <ProjectList
            key={refreshTrigger} // Force refresh when trigger changes
            onCreateProject={handleCreateProject}
            onEditProject={handleEditProject}
            onViewProject={handleViewProject}
            onStatsUpdate={handleStatsUpdate}
            companyId={user?.role !== 'super_admin' ? (user?.company_id || undefined) : undefined}
            showCompanyFilter={user?.role === 'super_admin'}
          />
        </div>
      </div>
    </div>
  )
}
