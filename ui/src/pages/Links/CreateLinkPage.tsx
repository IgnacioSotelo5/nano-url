import { Button } from '@/components/Button'
import { useTheme } from '@/hooks/useTheme'
import classNames from 'classnames'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { InputField } from '../components/InputField'
import { Checkbox } from './components/Checkbox'
import styles from './create-link-page.module.css'
import variables from '@/styles/variables.module.css'
import { Tooltip } from '@/components/Tooltip'
import { InfoIcon } from '@/components/icons/Icons'
import { createLink } from '@/api/links/links-api'
import { useDebounce } from '@/hooks/useDebounce'

export default function CreateLinkForm () {
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const [destinationUrl, setDestinationUrl] = useState('')
  const debouncedDestinationUrl = useDebounce(destinationUrl)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
	
    const destination = formData.get('originalUrl') as string
    const title = formData.get('title') as string
    const customShortUrl = formData.get('shortUrl') as string
    const generateQRCode = !!formData.get('generateQRCode') 
    const color = formData.get('color')
	
    const body = {
      originalUrl: destination,
      title,
	  customShortUrl: customShortUrl || null,
	  generateQRCode,
	  color: {
        dark: color,
        light: "#FFFFFF"
	  }
    }

    try {
      const res = await createLink(body)
	  if (res.ok) {
        navigate('/links')
	  }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDestinationUrl(event.target.value)
  }
  return (
		<div id='links-page' className={styles.linksContainer}>
			<div className={styles.createLinkWrapper}>
				<h2 className={styles.formTitle}>Crear nuevo enlace</h2>
				<form onSubmit={handleSubmit} className={styles.form} id='create-link-form'>
					<InputField
						htmlFor='originalUrl'
						placeholder='https://ejemplo.com/tu-enlace-super-largo'
						text='Destino'
						className={classNames(styles.input, { [variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light' })}
						type='text'
						id='originalUrl'
						name='originalUrl'
						value={destinationUrl}
						onChange={handleChange}
					/>
					<p className={styles.limitLinks} data-testid='limit-rate'>Puedes crear <strong className={styles.strong}>15</strong> enlaces más este mes.</p>
					<InputField
						htmlFor='title'
						text='Titulo (opcional)'
						className={classNames(styles.input, { [variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light' })}
						type='text'
						id='title'
						name='title'
					/>
					<hr className={styles.separator} />
					<h2>Formas de compartir</h2>
					<div className={styles.customField}>
						<InputField
							className={classNames(styles.domainDisabled, { [variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light' })}
							text='Dominio'
							htmlFor='domain-disabled'
							disabled
							value='nano.url'
							id='domain-disabled'
						/>
						<span>/</span>
						<InputField
							className={classNames(styles.input, { [variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light' })}
							text='Segmento personalizado (opcional)'
							htmlFor='shortUrl'
							name='shortUrl'
							id='shortUrl'
							type='text'
						/>
                        <div className={ styles.tooltip }>
                            <Tooltip text='El segmento personalizado puede contener un máximo de 20 caracteres.'>
                                <InfoIcon fill='#fff' />
                            </Tooltip>
                        </div>
					</div>
					<span className={styles.checkboxTitle}>Código QR</span>
					<Checkbox htmlFor='generateQRCode' />
				</form>
				<div className={classNames(styles.formFooter, { [variables.formFooterDark]: isDark === 'dark', [variables.formFooterLight]: isDark === 'light' })}>
					<Button customClassName={styles.cancelButtonLinks} form='create-link-form'>Cancelar</Button>
					<Button
						type='submit'
						customClassName={classNames(styles.primaryButtonLinks, { [styles.primaryButtonLinksDark]: isDark === 'dark' })}
						form='create-link-form'
					>
            		Crear enlace
					</Button>
				</div>
			</div>
		</div>
  )
}
