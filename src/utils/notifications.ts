import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

// Configurações do SweetAlert2
const swalConfig = {
  confirmButtonColor: '#2563eb', // blue-600
  cancelButtonColor: '#dc2626',  // red-600
  customClass: {
    popup: 'font-sans',
    title: 'text-slate-800',
    content: 'text-slate-600'
  }
}

// Toastr notifications
export const notify = {
  success: (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  },

  error: (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  },

  warning: (message: string) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  },

  info: (message: string) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }
}

// SweetAlert2 confirmations
export const confirm = {
  delete: async (itemName: string = 'item'): Promise<boolean> => {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: `Você não poderá reverter esta ação! O ${itemName} será excluído permanentemente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      ...swalConfig
    })
    return result.isConfirmed
  },

  action: async (title: string, text: string, confirmText: string = 'Sim, continuar!'): Promise<boolean> => {
    const result = await Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      ...swalConfig
    })
    return result.isConfirmed
  },

  warning: async (title: string, text: string): Promise<boolean> => {
    const result = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Entendi, continuar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      ...swalConfig
    })
    return result.isConfirmed
  }
}

// SweetAlert2 alerts
export const alert = {
  success: async (title: string, text?: string) => {
    await Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText: 'OK',
      ...swalConfig
    })
  },

  error: async (title: string, text?: string) => {
    await Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: 'OK',
      ...swalConfig
    })
  },

  info: async (title: string, text?: string) => {
    await Swal.fire({
      title,
      text,
      icon: 'info',
      confirmButtonText: 'OK',
      ...swalConfig
    })
  }
}
