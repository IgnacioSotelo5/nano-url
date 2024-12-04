import { FormEvent } from 'react'
import styles from './onboarding.module.css'
import { useTheme } from '@/hooks/useTheme'
import classNames from 'classnames'
import variables from '@/styles/variables.module.css'
import { updateUser } from '@/api/user/user-api'
import { useNavigate } from 'react-router-dom'
import { toast, Zoom } from 'react-toastify'
import { AlertIcon } from '@/components/icons/Icons'
import { UIMode } from '@/api/user/user-interface'

export default function OnboardingProfile () {
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const theme = formData.get('theme') as UIMode
    const body = {
      name,
      themePreference: theme
    }

    try {
      const res = await updateUser(body)

      if (res.ok) {
        navigate('/onboarding/profile-image')
      } else {
        toast.error(res.message, {
          type: 'error',
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: isDark ? 'dark' : 'light',
          transition: Zoom,
          progressStyle: {
            backgroundColor: '#f01'
          },
          style: {
            color: '#fff',
            width: '24rem',
            lineClamp: 2,
            textWrap: 'pretty',
            backgroundColor: '#000'
          },
          icon: <AlertIcon />
        })
      }
    } catch (error: any) {
      throw new Error('Error de red: ', error.message)
    }
  }
  return (
        <form
        className={styles.onboardingForm} onSubmit={handleSubmit}>
            <div className={styles.formTitle}>
                <h2>
                    Bienvenido a NanoURL!
                </h2>
                <p>
                    Terminemos de personalizar tu perfil juntos.
                </p>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="name">
                    Como deberiamos llamarte?
                    <input className={classNames(isDark === 'dark' ? variables.inputDark : variables.inputLight)} type="text" id="name" name="name" required autoComplete='off' />
                </label>
                <label htmlFor="theme">
                    Selecciona tu tema preferido
                <select value={isDark} onChange={toggleTheme} className={classNames(styles.selectTheme, { [variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light' })} name="theme" id="theme">
                    <option value="dark">
                        Dark
                    </option>
                    <option value="light">
                        Light
                    </option>
                </select>
                </label>
                <input className={styles.submitButton} type="submit" value="Crear" />
            </div>
        </form>
  )
}

// TODO: Onboarding para metricas
// Ej: Que tipo de trabajo realiza el usuario y que uso le dara a la app.
