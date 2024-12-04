import styles from './Avatar.module.css'
export function Avatar ({ src, alt }: { src: string, alt: string }): JSX.Element {
  return (
		<img className={styles.avatar} src={src} alt={alt} />
  )
}
