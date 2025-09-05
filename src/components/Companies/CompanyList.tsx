import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBuilding, 
  faEye, 
  faEdit, 
  faTrash, 
  faSearch,
  faPlus,
  faSpinner,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../auth/AuthContext'
import { confirm, notify } from '../../utils/notifications'
import { getCompanies, deleteCompany, type Company, type CompanyListResponse } from '../../services/companyService'

interface CompanyListProps {
  onCreateClick: () => void
  onViewClick: (company: Company) => void
  onEditClick: (company: Company) => void
}

export default function CompanyList({ onCreateClick, onViewClick, onEditClick }: CompanyListProps) {
  const { user } = useAuth()
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCompanies, setTotalCompanies] = useState(0)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const loadCompanies = async (page: number = 1) => {
    setLoading(true)
    setError(null)
    try {
      const response: CompanyListResponse = await getCompanies(page, 15)
      setCompanies(response.data)
      setCurrentPage(response.current_page)
      setTotalPages(response.last_page)
      setTotalCompanies(response.total)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Erro ao carregar empresas')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (company: Company) => {
    const confirmed = await confirm.delete(`empresa "${company.name}"`)
    if (!confirmed) {
      return
    }

    setDeletingId(company.id)
    try {
      await deleteCompany(company.id)
      await loadCompanies(currentPage)
      notify.success('Empresa excluída com sucesso!')
    } catch (err: any) {
      notify.error(err?.response?.data?.message || 'Erro ao excluir empresa')
    } finally {
      setDeletingId(null)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar busca
    console.log('Buscar por:', searchTerm)
  }

  const canDelete = user?.role === 'super_admin'
  const canEdit = user?.role === 'super_admin'
  const canCreate = user?.role === 'super_admin'

  useEffect(() => {
    loadCompanies()
  }, [])

  if (loading && companies.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <FontAwesomeIcon icon={faSpinner} className="text-blue-500 text-2xl animate-spin" />
        <span className="ml-2 text-slate-600">Carregando empresas...</span>
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
      {/* Filtros e busca */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <form onSubmit={handleSearch} className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" 
              />
              <input
                type="text"
                placeholder="Buscar empresas por nome, email ou CNPJ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBuilding} className="text-blue-500 text-xl mr-3" />
            <div>
              <p className="text-sm text-slate-600">Total de Empresas</p>
              <p className="text-2xl font-bold text-slate-900">{totalCompanies}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBuilding} className="text-green-500 text-xl mr-3" />
            <div>
              <p className="text-sm text-slate-600">Empresas Ativas</p>
              <p className="text-2xl font-bold text-slate-900">
                {companies.filter(c => c.is_active).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBuilding} className="text-slate-500 text-xl mr-3" />
            <div>
              <p className="text-sm text-slate-600">Empresas Inativas</p>
              <p className="text-2xl font-bold text-slate-900">
                {companies.filter(c => !c.is_active).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de empresas */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800">Empresas Cadastradas</h2>
          {canCreate && (
            <button
              onClick={onCreateClick}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Nova Empresa</span>
            </button>
          )}
        </div>

        {companies.length === 0 ? (
          <div className="p-12 text-center">
            <FontAwesomeIcon icon={faBuilding} className="text-slate-300 text-6xl mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">Nenhuma empresa encontrada</h3>
            <p className="text-slate-500">
              {canCreate ? 'Clique em "Nova Empresa" para começar.' : 'Não há empresas cadastradas.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {companies.map((company) => (
              <div key={company.id} className="p-6 hover:bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon icon={faBuilding} className="text-slate-400" />
                      <div>
                        <h3 className="text-lg font-medium text-slate-900">{company.name}</h3>
                        <p className="text-slate-600">{company.email}</p>
                        {company.cnpj && (
                          <p className="text-sm text-slate-500">CNPJ: {company.cnpj}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center space-x-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        company.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {company.is_active ? 'Ativa' : 'Inativa'}
                      </span>
                      
                      {company.projects_count !== undefined && (
                        <span className="text-sm text-slate-500">
                          {company.projects_count} projeto(s)
                        </span>
                      )}
                      
                      {company.tickets_count !== undefined && (
                        <span className="text-sm text-slate-500">
                          {company.tickets_count} ticket(s)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewClick(company)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Visualizar empresa"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    
                    {canEdit && (
                      <button
                        onClick={() => onEditClick(company)}
                        className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                        title="Editar empresa"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    )}
                    
                    {canDelete && (
                      <button
                        onClick={() => handleDelete(company)}
                        disabled={deletingId === company.id}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Excluir empresa"
                      >
                        <FontAwesomeIcon 
                          icon={deletingId === company.id ? faSpinner : faTrash} 
                          className={deletingId === company.id ? 'animate-spin' : ''}
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-200 flex justify-between items-center">
            <p className="text-sm text-slate-600">
              Página {currentPage} de {totalPages} ({totalCompanies} empresas)
            </p>
            
            <div className="flex space-x-2">
              <button
                onClick={() => loadCompanies(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className="px-3 py-1 border border-slate-300 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <button
                onClick={() => loadCompanies(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
                className="px-3 py-1 border border-slate-300 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próxima
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
