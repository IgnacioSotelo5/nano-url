import classNames from 'classnames'
import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import styles from './card.module.css'
import { Button } from '@/components/Button'
import button from '@/components/button.module.css'
import { useTheme } from '@/hooks/useTheme'
import variables from '@/styles/variables.module.css'

interface CardProps {
  icon: ReactNode
  title: ReactNode
  description?: ReactNode
  buttonText: ReactNode
  href: string
}

export function Card ({ icon, title, description, buttonText, href }: CardProps): JSX.Element {
  const { isDark } = useTheme()
  return (
		<div className={styles.cardContainer}>
			<div className={classNames(styles.cardImg, {
			  [variables.cardImgDark]: isDark === 'dark',
			  [variables.cardImgLight]: isDark === 'light'
			})}>
				{icon}
			</div>
			<div className={styles.cardContent}>
				<span>
					{title}
				</span>
				{description && <p className={styles.cardDescription}>{description}</p>}
				<Link to={href}>
					<Button customClassName={classNames({ [button.cardButton]: isDark === 'dark', [button.homeButton]: isDark === 'light' })}>
						{buttonText}
					</Button>
				</Link>
			</div>

		</div>
  )
}
