import api from './api'

export interface Project {
  id: number
  company_id: number
  name: string
  description: string
  hourly_rate: string
  is_active: boolean
  created_at: string
  updated_at: string
  company?: {
    id: number
    name: string
  }
  tickets_count?: number
  total_cost?: number
}

export interface CreateProjectData {
  company_id: number
  name: string
  description: string
  hourly_rate: string
  is_active?: boolean
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  id: number
}

export interface ProjectListResponse {
  data: Project[]
  current_page: number
  per_page: number
  total: number
  last_page: number
  first_page_url: string
  last_page_url: string
  next_page_url?: string
  prev_page_url?: string
  from: number
  to: number
  path: string
  links: Array<{
    url: string | null
    label: string
    page: number | null
    active: boolean
  }>
}

export interface ProjectTicket {
  id: number
  project_id: number
  title: string
  description: string
  status: string
  priority: string
  hours_worked: number
  created_at: string
  updated_at: string
}

export interface ProjectCostReport {
  project: Project
  total_hours: number
  total_cost: number
  monthly_breakdown: Array<{
    month: string
    hours: number
    cost: number
  }>
  tickets: ProjectTicket[]
}

export interface Company {
  id: number
  name: string
}

export interface ProjectStatistics {
  total_projects: number
  active_projects: number
  inactive_projects: number
  total_tickets: number
  avg_hourly_rate: number
}

export interface ProjectListResponseData {
  projects: ProjectListResponse
  statistics: ProjectStatistics
}

export interface PaginationMeta {
  current_page: number
  per_page: number
  total: number
  last_page: number
  next_page_url?: string
  prev_page_url?: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

// Listar projetos com paginação e filtros
export const getProjects = async (
  page: number = 1,
  perPage: number = 10,
  search?: string,
  companyId?: number,
  isActive?: boolean,
  showInactive: boolean = false
): Promise<ProjectListResponseData> => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString()
  })

  if (search) params.append('search', search)
  if (companyId) params.append('company_id', companyId.toString())
  if (isActive !== undefined) params.append('is_active', isActive.toString())
  if (showInactive) params.append('show_inactive', 'true')

  const response = await api.get(`/projects?${params.toString()}`)
  // A API agora retorna { data: { projects: {...}, statistics: {...} } }
  return response.data.data
}

// Buscar projeto específico
export const getProject = async (id: number): Promise<Project> => {
  const response = await api.get(`/projects/${id}`)
  return response.data.data
}

// Criar novo projeto
export const createProject = async (projectData: CreateProjectData): Promise<Project> => {
  const response = await api.post('/projects', projectData)
  return response.data.data
}

// Atualizar projeto
export const updateProject = async (projectData: UpdateProjectData): Promise<Project> => {
  const { id, ...data } = projectData
  const response = await api.put(`/projects/${id}`, data)
  return response.data.data
}

// Deletar projeto (apenas super_admin)
export const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`/projects/${id}`)
}

// Buscar tickets de um projeto
export const getProjectTickets = async (
  projectId: number,
  page: number = 1,
  perPage: number = 10,
  status?: string
): Promise<{
  data: ProjectTicket[]
  current_page: number
  per_page: number
  total: number
  last_page: number
}> => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString()
  })

  if (status) params.append('status', status)

  const response = await api.get(`/projects/${projectId}/tickets?${params.toString()}`)
  return response.data
}

// Relatório de custos do projeto
export const getProjectCostReport = async (
  projectId: number,
  startDate?: string,
  endDate?: string
): Promise<ProjectCostReport> => {
  const params = new URLSearchParams()
  
  if (startDate) params.append('start_date', startDate)
  if (endDate) params.append('end_date', endDate)

  const response = await api.get(`/projects/${projectId}/cost-report?${params.toString()}`)
  return response.data.data
}

// Ativar/Desativar projeto
export const toggleProjectStatus = async (id: number): Promise<Project> => {
  const response = await api.patch(`/projects/${id}/toggle-active`)
  return response.data.data
}

// Buscar projetos por empresa
export const getProjectsByCompany = async (companyId: number): Promise<Project[]> => {
  const response = await api.get(`/companies/${companyId}/projects`)
  return response.data.data
}

// Buscar empresas para seleção
export const getCompanies = async (
  page: number = 1, 
  perPage: number = 10,
  search: string = '',
  onlyActive: boolean = true
): Promise<{ data: Company[], pagination: PaginationMeta }> => {
  const response = await api.get('/companies', {
    params: { 
      page, 
      per_page: perPage, 
      search,
      only_active: onlyActive 
    }
  })
  return response.data
}
