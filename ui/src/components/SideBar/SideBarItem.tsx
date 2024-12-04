import classNames from 'classnames'
import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'

import styles from './SideBarItem.module.css'
import { SidebarContext } from '@/context/SidebarContext'
import { useTheme } from '@/hooks/useTheme'
import variables from '@/styles/variables.module.css'

type SidebarItemProps = {
    icon: React.ReactNode;
    text: string;
};

const urlActive: { [key: string]: string } = {
  Enlaces: '/links',
  Home: '/home',
  'Codigos QR': '/qr-codes',
  Páginas: '/pages'
}

export function SidebarItem ({ icon, text }: SidebarItemProps): JSX.Element {
  const { open } = useContext(SidebarContext)
  const { isDark } = useTheme()
  const location = useLocation()

  const isValidText = Object.keys(urlActive).includes(text)
  const activePath = isValidText ? urlActive[text] : ''
  const isActive = location.pathname === activePath

  return (
		<li
			role="menuitem"
			aria-current={isActive ? 'page' : undefined}
			className={classNames(styles.listItem, {
			  [styles.active]: isActive,
			  [styles.open]: open,
			  [styles.closed]: !open,
			  [variables.listItemDark]: isDark === 'dark',
			  [variables.listItemLight]: isDark === 'light'
			})}
		>
			<span className={styles.icon} aria-hidden="true">
				<i>{icon}</i>
			</span>
			<p className={styles.text} aria-label={text}>
				{text}
			</p>
		</li>
  )
}
