import classNames from 'classnames'
import { InputHTMLAttributes } from 'react'

import { useTheme } from '@/hooks/useTheme'
import variables from '@/styles/variables.module.css'
export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement>{
    text: string
    htmlFor: string
	labelStyle?: string
}

export function InputField ({ text, htmlFor, labelStyle, ...rest }: InputFieldProps): JSX.Element {
  const { isDark } = useTheme()
  return (
		<label className={labelStyle} htmlFor={htmlFor}>
			<span className={classNames({ [variables.darkLabel]: isDark === 'dark' })}>
				{text}
			</span>
			<input id={htmlFor} name={htmlFor} {...rest} />
		</label>
  )
}
