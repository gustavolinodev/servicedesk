// Utilitários para máscaras de formatação

// Função para aplicar máscara de CPF
export const applyCpfMask = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '')
  return cleanValue
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

// Função para aplicar máscara de CNPJ
export const applyCnpjMask = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '')
  return cleanValue
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

// Função para aplicar máscara de telefone
export const applyPhoneMask = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '')
  
  if (cleanValue.length <= 10) {
    // Telefone fixo: (00) 0000-0000
    return cleanValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  } else {
    // Celular: (00) 90000-0000
    return cleanValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  }
}

// Função para detectar e aplicar máscara de CPF ou CNPJ
export const applyCpfCnpjMask = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '')
  
  if (cleanValue.length <= 11) {
    return applyCpfMask(value)
  } else {
    return applyCnpjMask(value)
  }
}

// Função para detectar se é CPF ou CNPJ baseado no tamanho
export const getCpfCnpjMask = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '')
  
  if (cleanValue.length <= 11) {
    // CPF: 000.000.000-00
    return '999.999.999-99'
  } else {
    // CNPJ: 00.000.000/0000-00
    return '99.999.999/9999-99'
  }
}

// Função para formatar telefone (celular ou fixo)
export const getPhoneMask = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '')
  
  if (cleanValue.length <= 10) {
    // Telefone fixo: (00) 0000-0000
    return '(99) 9999-9999'
  } else {
    // Celular: (00) 90000-0000
    return '(99) 99999-9999'
  }
}

// Função para validar CPF
export const isValidCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '')
  
  if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) {
    return false
  }
  
  let sum = 0
  let remainder
  
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i)
  }
  
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false
  
  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i)
  }
  
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false
  
  return true
}

// Função para validar CNPJ
export const isValidCNPJ = (cnpj: string): boolean => {
  const cleanCNPJ = cnpj.replace(/\D/g, '')
  
  if (cleanCNPJ.length !== 14) {
    return false
  }
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) {
    return false
  }
  
  let sum = 0
  let weight = 2
  
  // Calcula o primeiro dígito verificador
  for (let i = 11; i >= 0; i--) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weight
    weight = weight === 9 ? 2 : weight + 1
  }
  
  let remainder = sum % 11
  const firstDigit = remainder < 2 ? 0 : 11 - remainder
  
  if (firstDigit !== parseInt(cleanCNPJ.charAt(12))) {
    return false
  }
  
  sum = 0
  weight = 2
  
  // Calcula o segundo dígito verificador
  for (let i = 12; i >= 0; i--) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weight
    weight = weight === 9 ? 2 : weight + 1
  }
  
  remainder = sum % 11
  const secondDigit = remainder < 2 ? 0 : 11 - remainder
  
  return secondDigit === parseInt(cleanCNPJ.charAt(13))
}

// Função para validar CPF ou CNPJ
export const isValidCpfCnpj = (value: string): boolean => {
  const cleanValue = value.replace(/\D/g, '')
  
  if (cleanValue.length === 11) {
    return isValidCPF(value)
  } else if (cleanValue.length === 14) {
    return isValidCNPJ(value)
  }
  
  return false
}

// Função para obter o tipo do documento
export const getDocumentType = (value: string): 'CPF' | 'CNPJ' | 'Inválido' => {
  const cleanValue = value.replace(/\D/g, '')
  
  if (cleanValue.length === 11) {
    return isValidCPF(value) ? 'CPF' : 'Inválido'
  } else if (cleanValue.length === 14) {
    return isValidCNPJ(value) ? 'CNPJ' : 'Inválido'
  }
  
  return 'Inválido'
}
