import api from './api'

export interface Company {
  id: number
  name: string
  email: string
  phone?: string
  address?: string
  cnpj: string
  is_active: boolean
  created_at: string
  updated_at: string
  admin?: {
    id: number
    name: string
    email: string
  }
  clientUsers?: {
    id: number
    name: string
    email: string
  }[]
  projects_count?: number
  tickets_count?: number
}

export interface CreateCompanyData {
  name: string
  email: string
  phone?: string
  address?: string
  cnpj: string
  is_active?: boolean
}

export interface UpdateCompanyData extends Partial<CreateCompanyData> {
  id: number
}

export interface CompanyListResponse {
  data: Company[]
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
  message: string
}

/**
 * Lista empresas com paginação (apenas ativas)
 */
export async function getCompanies(page: number = 1, perPage: number = 15): Promise<CompanyListResponse> {
  const response = await api.get<ApiResponse<CompanyListResponse>>('/companies', {
    params: { page, per_page: perPage }
  })
  return response.data.data
}

/**
 * Busca detalhes de uma empresa específica
 */
export async function getCompany(id: number): Promise<Company> {
  const response = await api.get<ApiResponse<Company>>(`/companies/${id}`)
  return response.data.data
}

/**
 * Cria uma nova empresa (apenas super_admin)
 */
export async function createCompany(data: CreateCompanyData): Promise<Company> {
  const response = await api.post<ApiResponse<Company>>('/companies', data)
  return response.data.data
}

/**
 * Atualiza uma empresa (super_admin ou client_admin da empresa)
 */
export async function updateCompany(data: UpdateCompanyData): Promise<Company> {
  const { id, ...updateData } = data
  const response = await api.put<ApiResponse<Company>>(`/companies/${id}`, updateData)
  return response.data.data
}

/**
 * Remove uma empresa (apenas super_admin)
 */
export async function deleteCompany(id: number): Promise<void> {
  await api.delete<ApiResponse<null>>(`/companies/${id}`)
}

/**
 * Busca empresas com filtro de texto
 */
export async function searchCompanies(query: string, page: number = 1, perPage: number = 15): Promise<CompanyListResponse> {
  const response = await api.get<ApiResponse<CompanyListResponse>>('/companies', {
    params: { 
      page, 
      per_page: perPage,
      search: query
    }
  })
  return response.data.data
}
