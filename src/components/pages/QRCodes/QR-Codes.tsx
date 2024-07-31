
import classNames from 'classnames'
import { FormEvent } from 'react'

import { QRPreview } from './components/PreviewQR'
import styles from './qrcodes.module.css'
import { InputField } from '../components/InputField'
import { Button } from '@/components/Button'
import { usePreview } from '@/hooks/usePreview'
import { useTheme } from '@/hooks/useTheme'
import variables from '@/styles/variables.module.css'

export default function QRCodes (): JSX.Element {
  const {url, setUrl} = usePreview()
  const {isDark} = useTheme()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    const formData = new FormData(event.currentTarget)
    const destination = formData.get('destination')
    const title = formData.get('title')
    const custom = formData.get('custom')
    
    console.log({destination, title, custom})
    
  }
  return (
      <div className={styles.qrContainer} id="qr-codes-page">
            <div className={styles.qrWrapper}>
              <h1 className={styles.title}>Crea un Codigo QR</h1>
              <form id='qr-form' onSubmit={handleSubmit} className={styles.form}>
              <InputField onChange={handleChange} htmlFor='destination' placeholder='https://ejemplo.com/tu-enlace-super-largo' text='URL de destino' className={classNames(styles.input, {[variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light'})} type='text' id='destination' name='destination' />
              <InputField htmlFor='title' text='Titulo (opcional)' className={classNames(styles.input, {[variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light'})} type='text' id='title' name='title' />
              <hr className={styles.separator} />
              <h3>Enlace de Nanourl</h3>
              <p>Este enlace llevará el mismo contenido que tu código Nano. Si actualizas el enlace más tarde, cambiará tu código existente</p>
              <div className={styles.customField}>
                  <InputField className={classNames(styles.domainDisabled, {[variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light'})} text='Dominio' htmlFor='domain-disabled' disabled value='nano.url' id='domain-disabled' />
                  <span>/</span>
                  <InputField className={classNames(styles.input, {[variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light'})} text='Segmento personalizado (opcional)' htmlFor='custom' name='custom' id='custom' />
              </div>
              </form>
              <div className={styles.formFooter}>
                <Button customClassName={styles.cancelButton} form='qr-form-cancel'>Cancelar</Button>
                <Button customClassName={styles.primaryButton} form='qr-form'>Crear código</Button>
              </div>
            </div>
            <div className={styles.previewWrapper}>
              <h2>QR preview</h2>
              <QRPreview url={url} />
            </div>
        </div>   
  )
}