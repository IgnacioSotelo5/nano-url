import classNames from 'classnames'
import { ChangeEvent, FormEvent, useState } from 'react'

import { Checkbox } from './components/Checkbox'
import styles from './links.module.css'
import { InputField } from '../components/InputField'
import { Button } from '@/components/Button'
import { useTheme } from '@/hooks/useTheme'
import variables from '@/styles/variables.module.css'

const generateShortCode = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let shortCode = ''
  for (let i = 0; i < length; i++) {
    shortCode += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return shortCode
}

export default function Links(): JSX.Element {
  const { isDark } = useTheme()
  const [url, setUrl] = useState<string>('')
  const [shortUrl, setShortUrl] = useState<string>('')
  const [originalUrl, setOriginalUrl] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const destination = formData.get('destination') as string
    const title = formData.get('titleInput') as string
    const customSegment = formData.get('custom') as string

    if (!destination) {
      setError('Por favor ingrese un URL de destino.')
      return
    }

    const existingEntries = JSON.parse(localStorage.getItem('urlMappings') || '[]')
    const existingEntry = existingEntries.find((entry: any) => entry.longUrl === destination)

    if (existingEntry) {
      setShortUrl(existingEntry.shortUrl)
      setOriginalUrl(existingEntry.longUrl)
      setError(null)
      return
    }

    const newShortCode = generateShortCode(6)
    const newEntry = { longUrl: destination, shortUrl: customSegment ? customSegment : newShortCode, title }

    localStorage.setItem('urlMappings', JSON.stringify([...existingEntries, newEntry]))
    setShortUrl(newEntry.shortUrl)
    setOriginalUrl(destination)
    setError(null)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }

  const handleClickShortUrl = () => {
    if (originalUrl) {
      window.open(originalUrl, '_blank', 'noopener, noreferrer')
    }
  }

  return (
    <div id='links-page' className={styles.linksContainer}>
      <div className={styles.createLinkWrapper}>
        <h2 className={styles.formTitle}>Crear nuevo enlace</h2>
        <form onSubmit={handleSubmit} className={styles.form} id='create-link-form'>
          <InputField
            onChange={handleChange}
            htmlFor='destination'
            placeholder='https://ejemplo.com/tu-enlace-super-largo'
            text='Destino'
            className={classNames(styles.input, { [variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light' })}
            type='text'
            id='destination'
            name='destination'
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p className={styles.limitLinks} data-testid='limit-rate'>Puedes crear <strong className={styles.strong}>15</strong> enlaces más este mes.</p>
          <InputField
            htmlFor='titleInput'
            text='Titulo (opcional)'
            className={classNames(styles.input, { [variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light' })}
            type='text'
            id='titleInput'
            name='titleInput'
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
              htmlFor='custom'
              name='custom'
              id='custom'
            />
          </div>
          <span className={styles.checkboxTitle}>Código QR</span>
          <Checkbox htmlFor='qr-checkbox' />
        </form>
        <div className={classNames(styles.formFooter, { [variables.formFooterDark]: isDark === 'dark', [variables.formFooterLight]: isDark === 'light' })}>
          <Button customClassName={styles.cancelButtonLinks} form='create-link-form'>Cancelar</Button>
          <Button
            type='submit'
            customClassName={classNames(styles.primaryButtonLinks, { [styles.primaryButtonLinksDark]: isDark === 'dark' })}
            form='create-link-form'
          >
            Crear código
          </Button>
        </div>
        {shortUrl && (
          <div className={styles.shortUrl}>
            <p>Short URL:</p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault() // Previene el comportamiento por defecto del enlace
                handleClickShortUrl() // Llama a la función de redirección
              }}
            >
              {window.location.origin}/{shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
