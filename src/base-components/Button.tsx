import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export default function Button({ variant = 'primary', size = 'md', loading = false, leftIcon, rightIcon, className = '', children, ...props }: Props) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'
  const variants: Record<string, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-slate-900/5 text-slate-800 hover:bg-slate-900/10 focus:ring-slate-400',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-900/5 focus:ring-slate-400'
  }
  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'px-5 py-2.5'
  }
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} aria-busy={loading} {...props}>
      {loading && (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
      )}
      {!loading && leftIcon}
      <span>{children}</span>
      {!loading && rightIcon}
    </button>
  )
}
