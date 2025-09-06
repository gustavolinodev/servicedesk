import React, { useState, useEffect } from 'react'

interface MaskedInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  mask: (value: string) => string
  placeholder?: string
  className?: string
  id?: string
  name?: string
  [key: string]: any
}

export default function MaskedInput({
  value,
  onChange,
  mask,
  placeholder,
  className,
  id,
  name,
  ...props
}: MaskedInputProps) {
  const [displayValue, setDisplayValue] = useState('')
  
  // Atualiza o valor exibido quando o valor prop muda
  useEffect(() => {
    if (value) {
      const masked = mask(value)
      setDisplayValue(masked)
    } else {
      setDisplayValue('')
    }
  }, [value, mask])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    
    // Remove todos os caracteres não numéricos para enviar para o parent
    const cleanValue = inputValue.replace(/\D/g, '')
    
    // Atualiza o valor exibido com a máscara
    const masked = mask(cleanValue)
    setDisplayValue(masked)
    
    // Cria um evento sintético com o valor limpo para o parent
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name: name || '',
        value: cleanValue
      }
    }
    
    onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>)
  }
  
  return (
    <input
      type="text"
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      id={id}
      name={name}
      {...props}
    />
  )
}
