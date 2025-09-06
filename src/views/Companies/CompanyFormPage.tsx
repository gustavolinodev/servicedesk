import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSave, 
  faSpinner,
  faBuilding,
  faExclamationTriangle,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../auth/AuthContext'
import BackButton from '../../base-components/BackButton'
import MaskedInput from '../../components/common/MaskedInput'
import { notify } from '../../utils/notifications'
import { 
  createCompany, 
  updateCompany, 
  type Company, 
  type CreateCompanyData, 
  type UpdateCompanyData 
} from '../../services/companyService'
import { 
  applyCpfCnpjMask,
  applyPhoneMask,
  isValidCpfCnpj, 
  getDocumentType 
} from '../../utils/masks'

interface CompanyFormPageProps {
  company?: Company | null
  onBack: () => void
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

export default function CompanyFormPage({ company, onBack, onSuccess }: CompanyFormPageProps) {
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
      newErrors.cnpj = 'CPF/CNPJ é obrigatório'
    } else if (!isValidCpfCnpj(formData.cnpj)) {
      const documentType = getDocumentType(formData.cnpj)
      if (documentType === 'Inválido') {
        newErrors.cnpj = 'CPF ou CNPJ inválido'
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
      
      // Notificação de sucesso
      notify.success(
        isEditing 
          ? 'Empresa atualizada com sucesso!' 
          : 'Empresa criada com sucesso!'
      )
      
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        // Erros de validação do backend
        setErrors(err.response.data.errors)
        notify.error('Por favor, corrija os erros no formulário')
      } else {
        // Erro genérico
        const errorMessage = err?.response?.data?.message || 'Erro ao salvar empresa'
        setErrors({
          general: errorMessage
        })
        notify.error(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  const canSave = user?.role === 'super_admin' || (isEditing && user?.role === 'client_admin')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <BackButton onClick={onBack} />
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faBuilding} className="text-blue-600 text-2xl" />
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                {isEditing ? 'Editar Empresa' : 'Nova Empresa'}
              </h1>
              <p className="text-slate-600">
                {isEditing ? 'Modifique as informações da empresa' : 'Cadastre uma nova empresa no sistema'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Erro geral */}
      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
          {errors.general}
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome da empresa */}
            <div className="md:col-span-2">
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

            {/* CPF/CNPJ */}
            <div>
              <label htmlFor="cnpj" className="block text-sm font-medium text-slate-700 mb-2">
                CPF/CNPJ *
              </label>
              <div className="relative">
                <MaskedInput
                  mask={applyCpfCnpjMask}
                  value={formData.cnpj}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.cnpj ? 'border-red-300' : 'border-slate-300'
                  }`}
                  placeholder="000.000.000-00 ou 00.000.000/0000-00"
                  id="cnpj"
                  name="cnpj"
                />
                {formData.cnpj && !errors.cnpj && isValidCpfCnpj(formData.cnpj) && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FontAwesomeIcon 
                      icon={faCheckCircle} 
                      className="text-green-500"
                    />
                    <span className="ml-1 text-xs text-green-600">
                      {getDocumentType(formData.cnpj)}
                    </span>
                  </div>
                )}
                {formData.cnpj && errors.cnpj && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FontAwesomeIcon 
                      icon={faTimesCircle} 
                      className="text-red-500"
                    />
                  </div>
                )}
              </div>
              {errors.cnpj && (
                <p className="mt-1 text-sm text-red-600">{errors.cnpj}</p>
              )}
              {formData.cnpj && !errors.cnpj && isValidCpfCnpj(formData.cnpj) && (
                <p className="mt-1 text-sm text-green-600">
                  ✓ {getDocumentType(formData.cnpj)} válido
                </p>
              )}
            </div>

            {/* Telefone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                Telefone
              </label>
              <MaskedInput
                mask={applyPhoneMask}
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="(00) 0000-0000 ou (00) 90000-0000"
                id="phone"
                name="phone"
              />
            </div>

            {/* Status ativo */}
            {(user?.role === 'super_admin') && (
              <div className="flex items-center">
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
              </div>
            )}
          </div>

          {/* Endereço */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">
              Endereço
            </label>
            <textarea
              id="address"
              name="address"
              rows={4}
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite o endereço completo da empresa"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onBack}
              disabled={loading}
              className="px-6 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
            >
              Cancelar
            </button>
            
            {canSave && (
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
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
