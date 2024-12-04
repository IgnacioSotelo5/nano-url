import { ButtonHTMLAttributes, type ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  customClassName?: string // Hacer la propiedad opcional
}

export function Button ({ children, customClassName, ...rest }: ButtonProps) {
  return (
		<button {...rest} className={customClassName}>{children}</button>
  )
}
