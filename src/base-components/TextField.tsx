import type { InputHTMLAttributes, ReactNode } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  inputClassName?: string
}

export default function TextField({ label, error, className = '', inputClassName = '', leftIcon, rightIcon, id, ...props }: Props) {
  const inputId = id || props.name
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center text-slate-400">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${inputClassName}`}
          {...props}
        />
        {rightIcon && (
          <span className="absolute inset-y-0 right-3 inline-flex items-center text-slate-400">
            {rightIcon}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )}
