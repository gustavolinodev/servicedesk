import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSave, 
  faSpinner,
  faProjectDiagram,
  faExclamationTriangle,
  faBuilding,
  faDollarSign
} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../auth/AuthContext'
import BackButton from '../../base-components/BackButton'
import { notify } from '../../utils/notifications'
import { getCompanies } from '../../services/companyService'
import { 
  createProject, 
  updateProject, 
  type Project, 
  type CreateProjectData, 
  type UpdateProjectData 
} from '../../services/projectService'

interface ProjectFormPageProps {
  project?: Project | null
  onBack: () => void
  onSuccess: (project: Project) => void
  companyId?: number // Se especificado, fixa a empresa
}

interface FormData {
  company_id: string
  name: string
  description: string
  hourly_rate: string
  is_active: boolean
}

interface FormErrors {
  [key: string]: string
}

interface Company {
  id: number
  name: string
}

export default function ProjectFormPage({ project, onBack, onSuccess, companyId }: ProjectFormPageProps) {
  const { user } = useAuth()
  const isEditing = Boolean(project?.id)
  
  const [formData, setFormData] = useState<FormData>({
    company_id: companyId?.toString() || project?.company_id?.toString() || '',
    name: project?.name || '',
    description: project?.description || '',
    hourly_rate: project?.hourly_rate || '',
    is_active: project?.is_active ?? true
  })

  const [companies, setCompanies] = useState<Company[]>([])
  const [loadingCompanies, setLoadingCompanies] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)

  const canEditStatus = user?.role === 'super_admin'
  const needsCompanySelection = !companyId && user?.role === 'super_admin'

  // Carregar empresas se necessário
  useEffect(() => {
    if (needsCompanySelection) {
      loadCompanies()
    }
  }, [needsCompanySelection])

  const loadCompanies = async () => {
    setLoadingCompanies(true)
    try {
      const response = await getCompanies(1, 100) // Carregar todas para seleção
      setCompanies(response.data)
    } catch (error) {
      notify.error('Erro ao carregar empresas')
    } finally {
      setLoadingCompanies(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleHourlyRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    
    // Remove caracteres não numéricos exceto vírgula e ponto
    value = value.replace(/[^\d.,]/g, '')
    
    // Substitui vírgula por ponto para formato numérico
    value = value.replace(',', '.')
    
    // Limita a 2 casas decimais
    if (value.includes('.')) {
      const parts = value.split('.')
      if (parts[1]?.length > 2) {
        value = parts[0] + '.' + parts[1].substring(0, 2)
      }
    }

    setFormData(prev => ({
      ...prev,
      hourly_rate: value
    }))

    if (errors.hourly_rate) {
      setErrors(prev => ({
        ...prev,
        hourly_rate: ''
      }))
    }
  }

  const formatCurrency = (value: string): string => {
    if (!value) return ''
    const numValue = parseFloat(value)
    if (isNaN(numValue)) return value
    return numValue.toLocaleString('pt-BR', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome do projeto é obrigatório'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória'
    }

    if (!formData.company_id) {
      newErrors.company_id = 'Empresa é obrigatória'
    }

    if (!formData.hourly_rate) {
      newErrors.hourly_rate = 'Valor por hora é obrigatório'
    } else {
      const hourlyRate = parseFloat(formData.hourly_rate)
      if (isNaN(hourlyRate) || hourlyRate <= 0) {
        newErrors.hourly_rate = 'Valor por hora deve ser um número positivo'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    try {
      const projectData = {
        company_id: parseInt(formData.company_id),
        name: formData.name.trim(),
        description: formData.description.trim(),
        hourly_rate: formData.hourly_rate,
        is_active: formData.is_active
      }

      let savedProject: Project

      if (isEditing && project) {
        const updateData: UpdateProjectData = {
          id: project.id,
          ...projectData
        }
        savedProject = await updateProject(updateData)
        notify.success('Projeto atualizado com sucesso!')
      } else {
        const createData: CreateProjectData = projectData
        savedProject = await createProject(createData)
        notify.success('Projeto criado com sucesso!')
      }
      
      onSuccess(savedProject)
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || `Erro ao ${isEditing ? 'atualizar' : 'criar'} projeto`
      setErrors({ general: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <BackButton onClick={onBack} />
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-slate-800 flex items-center">
              <FontAwesomeIcon icon={faProjectDiagram} className="mr-3 text-blue-600" />
              {isEditing ? 'Editar Projeto' : 'Novo Projeto'}
            </h1>
            <p className="text-slate-600 mt-2">
              {isEditing 
                ? 'Atualize as informações do projeto' 
                : 'Preencha as informações para criar um novo projeto'
              }
            </p>
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          {/* Erro geral */}
          {errors.general && (
            <div className="m-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Empresa */}
              {needsCompanySelection && (
                <div>
                  <label htmlFor="company_id" className="block text-sm font-medium text-slate-700 mb-2">
                    <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                    Empresa *
                  </label>
                  <select
                    id="company_id"
                    name="company_id"
                    value={formData.company_id}
                    onChange={handleChange}
                    disabled={loadingCompanies}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.company_id ? 'border-red-300' : 'border-slate-300'
                    }`}
                  >
                    <option value="">Selecione uma empresa</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                  {errors.company_id && (
                    <p className="mt-1 text-sm text-red-600">{errors.company_id}</p>
                  )}
                </div>
              )}

              {/* Nome do projeto */}
              <div className={needsCompanySelection ? '' : 'lg:col-span-2'}>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Nome do Projeto *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.name ? 'border-red-300' : 'border-slate-300'
                  }`}
                  placeholder="Digite o nome do projeto"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Valor por hora */}
              <div className={needsCompanySelection ? 'lg:col-span-2' : 'lg:col-span-2'}>
                <label htmlFor="hourly_rate" className="block text-sm font-medium text-slate-700 mb-2">
                  <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                  Valor por Hora (R$) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="hourly_rate"
                    name="hourly_rate"
                    value={formData.hourly_rate}
                    onChange={handleHourlyRateChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.hourly_rate ? 'border-red-300' : 'border-slate-300'
                    }`}
                    placeholder="0,00"
                  />
                  {formData.hourly_rate && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">
                      R$ {formatCurrency(formData.hourly_rate)}
                    </div>
                  )}
                </div>
                {errors.hourly_rate && (
                  <p className="mt-1 text-sm text-red-600">{errors.hourly_rate}</p>
                )}
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                Descrição *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.description ? 'border-red-300' : 'border-slate-300'
                }`}
                placeholder="Descreva o projeto, suas funcionalidades e objetivos..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Status ativo */}
            {canEditStatus && (
              <div className="flex items-center">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Projeto ativo
                  </span>
                </label>
                <p className="ml-4 text-xs text-slate-500">
                  Apenas projetos ativos podem receber novos tickets
                </p>
              </div>
            )}

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                    {isEditing ? 'Salvando...' : 'Criando...'}
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    {isEditing ? 'Salvar Alterações' : 'Criar Projeto'}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onBack}
                disabled={loading}
                className="border border-slate-300 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
