import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

interface BackButtonProps {
  onClick: () => void
  label?: string
  className?: string
}

export default function BackButton({ onClick, label = 'Voltar', className = '' }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center space-x-2 px-4 py-2 
        text-slate-600 hover:text-slate-800 
        bg-white hover:bg-slate-50 
        border border-slate-200 hover:border-slate-300
        rounded-lg transition-all duration-200 
        shadow-sm hover:shadow
        font-medium text-sm
        ${className}
      `}
    >
      <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
      <span>{label}</span>
    </button>
  )
}
