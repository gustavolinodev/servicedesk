import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faTimes, 
  faSave, 
  faSpinner,
  faBuilding,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../auth/AuthContext'
import { 
  createCompany, 
  updateCompany, 
  type Company, 
  type CreateCompanyData, 
  type UpdateCompanyData 
} from '../../services/companyService'

interface CompanyFormProps {
  company?: Company | null
  onClose: () => void
  onSuccess: (company: Company) => void
}

interface FormData {
  name: string
  email: string
  phone: string
  address: string
  cnpj: string
  is_active: boolean
}

export default function CompanyForm({ company, onClose, onSuccess }: CompanyFormProps) {
  const { user } = useAuth()
  const isEditing = !!company
  
  const [formData, setFormData] = useState<FormData>({
    name: company?.name || '',
    email: company?.email || '',
    phone: company?.phone || '',
    address: company?.address || '',
    cnpj: company?.cnpj || '',
    is_active: company?.is_active ?? true,
  })
  
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Limpa erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome da empresa é obrigatório'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email deve ter um formato válido'
    }
    
    if (!formData.cnpj.trim()) {
      newErrors.cnpj = 'CNPJ é obrigatório'
    } else if (!/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(formData.cnpj)) {
      // Formato básico de CNPJ: 00.000.000/0000-00
      newErrors.cnpj = 'CNPJ deve estar no formato 00.000.000/0000-00'
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
      let savedCompany: Company
      
      if (isEditing && company) {
        const updateData: UpdateCompanyData = {
          id: company.id,
          ...formData
        }
        savedCompany = await updateCompany(updateData)
      } else {
        const createData: CreateCompanyData = formData
        savedCompany = await createCompany(createData)
      }
      
      onSuccess(savedCompany)
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        // Erros de validação do backend
        setErrors(err.response.data.errors)
      } else {
        // Erro genérico
        setErrors({
          general: err?.response?.data?.message || 'Erro ao salvar empresa'
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const canSave = user?.role === 'super_admin' || (isEditing && user?.role === 'client_admin')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faBuilding} className="text-blue-600 text-xl" />
            <h2 className="text-xl font-semibold text-slate-800">
              {isEditing ? 'Editar Empresa' : 'Nova Empresa'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>

        {/* Erro geral */}
        {errors.general && (
          <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
            {errors.general}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nome da empresa */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
              Nome da Empresa *
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
              placeholder="Digite o nome da empresa"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? 'border-red-300' : 'border-slate-300'
              }`}
              placeholder="Digite o email da empresa"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* CNPJ */}
          <div>
            <label htmlFor="cnpj" className="block text-sm font-medium text-slate-700 mb-2">
              CNPJ *
            </label>
            <input
              type="text"
              id="cnpj"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.cnpj ? 'border-red-300' : 'border-slate-300'
              }`}
              placeholder="00.000.000/0000-00"
            />
            {errors.cnpj && (
              <p className="mt-1 text-sm text-red-600">{errors.cnpj}</p>
            )}
          </div>

          {/* Telefone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
              Telefone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="(00) 0000-0000"
            />
          </div>

          {/* Endereço */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">
              Endereço
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite o endereço completo da empresa"
            />
          </div>

          {/* Status ativo */}
          {(user?.role === 'super_admin') && (
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <span className="text-sm font-medium text-slate-700">
                  Empresa ativa
                </span>
              </label>
              <p className="mt-1 text-sm text-slate-500">
                Empresas inativas não podem acessar o sistema
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50"
            >
              Cancelar
            </button>
            {canSave && (
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <FontAwesomeIcon 
                  icon={loading ? faSpinner : faSave} 
                  className={loading ? 'animate-spin' : ''}
                />
                <span>{loading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Criar Empresa')}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
