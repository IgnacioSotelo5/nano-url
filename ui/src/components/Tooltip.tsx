import { ReactNode, useState } from 'react'
import styles from './tooltip.module.css'

export function Tooltip ({ text, children }: {text: string, children: ReactNode}) {
  const [isVisible, setIsVisible] = useState(false)

  return (
        <div
        onMouseEnter={() => setIsVisible(!isVisible)}
        onMouseLeave={() => setIsVisible(!isVisible)}
        className={styles.tooltipContainer}>
            {children}
            {isVisible && <p className={styles.tooltipText}>{text}</p>}
        </div>
  )
}
