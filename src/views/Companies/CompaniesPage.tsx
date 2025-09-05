import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faPlus } from '@fortawesome/free-solid-svg-icons'
import { CompanyList } from '../../components/Companies'
import type { Company } from '../../services/companyService'

interface CompaniesPageProps {
  onCreateClick: () => void
  onViewClick: (company: Company) => void
  onEditClick: (company: Company) => void
}

export default function CompaniesPage({ onCreateClick, onViewClick, onEditClick }: CompaniesPageProps) {
  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faBuilding} className="text-2xl text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Gestão de Empresas</h1>
              <p className="text-slate-600">Gerencie todas as empresas do sistema</p>
            </div>
          </div>
          <button
            onClick={onCreateClick}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Nova Empresa</span>
          </button>
        </div>
      </div>

      {/* Company List */}
      <CompanyList
        onCreateClick={onCreateClick}
        onViewClick={onViewClick}
        onEditClick={onEditClick}
      />
    </>
  )
}
