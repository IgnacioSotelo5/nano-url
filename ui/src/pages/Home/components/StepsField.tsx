import classNames from 'classnames'
import { type ReactNode, useState } from 'react'

import styles from '@/pages/Home/components/steps.module.css'
import { useTheme } from '@/hooks/useTheme'
import variables from '@/styles/variables.module.css'

export function Steps ({ title, buttons }: { title: string, buttons: ReactNode }): JSX.Element {
  const [completed, setCompleted] = useState(false)
  const { isDark } = useTheme()
  return (
		<li className={classNames(styles.listItem, { [variables.listItemDark]: isDark === 'dark', [variables.listItemLight]: isDark === 'light' })}>
			<div className={styles.titleContainer}>
				<div className={classNames(styles.checkField, { [styles.completed]: completed, [styles.uncompleted]: !completed, [variables.checkFieldDark]: isDark === 'dark', [variables.checkFieldLight]: isDark === 'light' })}></div>
				<p className={styles.title}>{title}</p>
			</div>
			<div className={styles.buttonContainer}>
				{buttons}
			</div>
		</li>
  )
}
