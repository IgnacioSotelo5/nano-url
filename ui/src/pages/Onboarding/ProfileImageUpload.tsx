import { ChangeEvent, FormEvent, MouseEventHandler, useState } from 'react'
import styles from './profile-image-upload.module.css'
import { AlertIcon, UploadIcon } from '@/components/icons/Icons'
import variables from '@/styles/variables.module.css'
import classNames from 'classnames'
import { useTheme } from '@/hooks/useTheme'
import { updateProfileImage } from '@/api/user/user-api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function ProfileImageUpload () {
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string|null>()
  const { isDark } = useTheme()
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const file = formData.get('file') as File
    if (!file) {
      toast.error('No hay ningun archivo seleccionado.', {
        type: 'error',
        icon: <AlertIcon />
      })
      return
    }
    try {
      const res = await updateProfileImage(formData)

      if (res.ok) {
        navigate('/home')
      }
    } catch (error) {

    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const selectedFile = files[0]

      const fileRegex = /^image\/(jpeg|jpg|png|gif)$/
      if (!fileRegex.test(selectedFile.type)) {
        setError(`El tipo de archivo ${selectedFile.type} no está permitido. Solo se aceptan .jpeg, .jpg y .png.`)
        setPreview(null)
        return
      }

      setError(null)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleSkip = () => {
    navigate('/home')
  }

  return (
        <section className={classNames(styles.uploadContainer, { [variables.dark]: isDark === 'dark', [variables.light]: isDark === 'light' })}>
          <form className={styles.uploadForm} method='POST' encType='multipart/form-data' onSubmit={handleSubmit}>
              <div className={styles.formTitle}>
                <h3>Sube tu foto de perfil</h3>
              </div>
              <hr className={classNames(styles.hr, { [variables.separatorDark]: isDark === 'dark', [variables.separatorLight]: isDark === 'light' })} />
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="file">
                  <span className={styles.labelContent}>
                    {
                      preview
                        ? (
                            <img className={styles.imgPreview} src={preview} alt="Vista previa de la imágen de perfil." />
                          )
                        : (
                        <>
                          <UploadIcon />
                          <p>
                            Haga clic o arrastre el archivo hasta aqui para cargarlo
                          </p>
                        </>
                          )
                        }
                  </span>
                  <input onChange={handleChange} type="file" name='file' id='file' hidden />
                </label>
                {error
                  ? <p className={classNames(styles.formats, error && styles.error)}>{error}</p>
                  : <p className={styles.formats}>Los formatos aceptados son .jpeg, .jpg y .png</p>
                }
              </div>
              <hr className={classNames(styles.hr, { [variables.separatorDark]: isDark === 'dark', [variables.separatorLight]: isDark === 'light' })} />
              <div className={styles.optionsButton}>
                <input className={styles.cancelButton} type="button" value="Omitir paso" onClick={handleSkip}/>
                <input className={styles.submitButton} type="submit" value="Subir imagen" />
              </div>
          </form>
        </section>
  )
}
