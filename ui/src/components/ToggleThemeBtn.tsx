import classNames from 'classnames'
import { InputHTMLAttributes } from 'react'

import { MoonIcon, SunIcon } from './icons/Icons'
import styles from '@/components/toggleThemeBtn.module.css'
import variables from '@/styles/variables.module.css'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggleBtn ({ ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  const { isDark, toggleTheme } = useTheme()

  return (
		<label onClick={toggleTheme} aria-label="checked" id='theme-check' className={classNames(styles.checkboxStyle, { [variables.dark]: isDark === 'dark', [variables.light]: isDark === 'light' })} htmlFor='theme-checkbox'>
			<input {...rest} type="checkbox" className={styles.checkboxInput} id='theme-checkbox' />
			<span className={styles.checkboxSpan}></span>
			<div className={styles.icons}>
				<MoonIcon />
				<SunIcon />
			</div>
		</label>
  )
}
