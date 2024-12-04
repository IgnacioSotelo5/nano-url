import classNames from 'classnames'
import { FormEvent } from 'react'

import styles from './link-in-bio.module.css'
import { InputField } from '../components/InputField'
import { Button } from '@/components/Button'
import button from '@/components/button.module.css'
import { useTheme } from '@/hooks/useTheme'
import variables from '@/styles/variables.module.css'

export default function LinkInBio (): JSX.Element {
  const { isDark } = useTheme()
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const customField = formData.get('custom-field')
  }
  return (
		<div className={styles.container} id="link-in-bio-page">
			<div className={styles.pagesWrapper}>
				<h1 className={styles.pageTitle}>Crear una página</h1>
				<form onSubmit={handleSubmit} className={styles.form}>
					<p>Crea una página atractiva para compartir y administrar todos los enlaces que te interesan. NanoURL ayuda a creadores y empresas de todo tipo a compartir sus enlaces.</p>
					<div className={styles.customField}>
						<InputField disabled className={classNames(styles.disabled, { [styles.input]: true })} text='' htmlFor='disabled' id='disabled' name='disabled' placeholder='nano.url' />
						<InputField className={classNames(styles.input, { [variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light' })} text='' htmlFor='custom-field' id='custom-field' name='custom-field' placeholder='Su nombre o negocio' />
						<Button customClassName={classNames(styles.buttonSubmit, { [button.primaryButtonDark]: isDark === 'dark' })}>
                    Crear página
						</Button>
					</div>
					<h4>Comparte todos tus enlaces con una URL.</h4>
					<p className={classNames(styles.paragraph, { [variables.lightParagraph]: isDark === 'light' })}>Las páginas Nano son una forma facil de enseñar tus enlaces, flexible de organizar y compartir tu contenido con el poder y la confianza de los enlaces cortos que brinda nuestro servicio. </p>
				</form>
			</div>
		</div>
  )
}
