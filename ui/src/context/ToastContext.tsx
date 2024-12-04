import { createContext, useContext, ReactNode } from 'react'
import { toast, ToastOptions } from 'react-toastify'

interface ToastContextProps {
  showSuccessMessage: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const showSuccessMessage = (message: string, options?: ToastOptions) => {
    toast.success(message, options)
  }

  return (
    <ToastContext.Provider value={{ showSuccessMessage }}>
      {children}
    </ToastContext.Provider>
  )
}
