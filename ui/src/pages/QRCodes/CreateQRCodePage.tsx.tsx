import classNames from 'classnames'
import { FormEvent, useState } from 'react'

import styles from './qrcodes.module.css'
import { InputField } from '../components/InputField'
import { Button } from '@/components/Button'
import { useTheme } from '@/hooks/useTheme'
import variables from '@/styles/variables.module.css'
import { QRCodeSVG } from 'qrcode.react'
import { createQrCode } from '@/api/qrCodes/qr-codes-api'
import { useNavigate } from 'react-router-dom'

export default function CreateQRCodePage (): JSX.Element {
  const { isDark } = useTheme()
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    const formData = new FormData(event.currentTarget)
    const originalUrl = formData.get('originalUrl') as string
    const title = formData.get('title') as string
    const customShortUrl = formData.get('customShortUrl') as string

    const body = {
      originalUrl,
      title,
      customShortUrl: customShortUrl || null
    }

    try {
		
      const res = await createQrCode(body)
	  
	  if (res.ok) {
        navigate('/qr-codes')
 	  }
    } catch (error) {
      console.error()
    }
  }
  return (
		<div className={styles.qrContainer} id="qr-codes-page">
			<div className={styles.qrWrapper}>
				<h1 className={styles.title}>Crea un Codigo QR</h1>
				<form id='qr-form' onSubmit={handleSubmit} className={styles.form}>
					<InputField htmlFor='originalUrl'
					placeholder='https://ejemplo.com/tu-enlace-super-largo'
					text='URL de destino'
					className={classNames(styles.input, { [variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light' })} 
					type='text' 
					value={url}
					onChange={(event) => setUrl(event?.target.value)}
					id='originalUrl' 
					name='originalUrl' />
					<InputField htmlFor='title' text='Titulo (opcional)' className={classNames(styles.input, { [variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light' })} type='text' id='title' name='title' />
					<hr className={styles.separator} />
					<h3>Enlace de Nanourl</h3>
					<p>Este enlace llevará el mismo contenido que tu código Nano. Si actualizas el enlace más tarde, cambiará tu código existente</p>
					<div className={styles.customField}>
						<InputField className={classNames(styles.domainDisabled, { [variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light' })} text='Dominio' htmlFor='domain-disabled' disabled value='nano.url' id='domain-disabled' />
						<span>/</span>
						<InputField className={classNames(styles.input, { [variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light' })} text='Segmento personalizado (opcional)' htmlFor='customShortUrl' name='customShortUrl' id='customShortUrl' />
					</div>
					<div className={styles.formFooter}>
						<Button customClassName={styles.cancelButton} form='qr-form-cancel'>Cancelar</Button>
						<Button customClassName={styles.primaryButton} form='qr-form'>Crear código</Button>
					</div>
				</form>
				
			</div>
			<div className={styles.previewWrapper}>
				<h2>QR preview</h2>
				<div >
					<QRCodeSVG size={250} style={{ border: `6px solid ${isDark === 'dark' ? '#FFF' : '#000'}` }} value='http://localhost:3000' fgColor={''} />
				</div>
			</div>
		</div>
  )
}
