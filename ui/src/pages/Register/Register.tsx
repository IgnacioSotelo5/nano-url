import { AlertIcon, CheckIcon, EyeIcon, EyeOffIcon, FullLogo } from '@/components/icons/Icons'
import styles from './register.module.css'
import variables from '@/styles/variables.module.css'
import classNames from 'classnames'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { PasswordValidationList } from './PasswordValidationList'
import { PasswordValidation } from './interface/PasswordValidation.interface'
import { toast, ToastContainer, Zoom } from 'react-toastify'
import { loginUser, registerUser } from '@/api/auth/auth-api'
import { useNavigate } from 'react-router-dom'

const initialPasswordValidation: PasswordValidation = {
  length: false,
  uppercase: false,
  number: false,
  specialChar: false
}

export default function Register () {
  const { isDark } = useTheme()
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false)
  const [showPass, setShowPass] = useState(false)
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>(initialPasswordValidation)
  const navigate = useNavigate()

  const validatePassword = (password: string) => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*.-]/.test(password)
    })
  }

  const handlePasswordValidation = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    validatePassword(value)
  }

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    if (!email || !password) {
      console.error('El email y la contraseña son requeridos.')
    }
    const body = {
      email,
      password
    }

    try {
      const res = await registerUser(body)

      if (res.ok) {
        toast.success('Registro exitoso', {
          autoClose: 3000,
          position: 'top-center',
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: isDark ? 'dark' : 'light',
          transition: Zoom,
          progressStyle: {
            backgroundColor: 'green'
          },
          type: 'success',
          icon: <CheckIcon />
        })

        const loginResponse = await loginUser(body)

        if (loginResponse.ok) {
          setTimeout(() => {
            navigate('/onboarding')
          }, 4000)
        } else {
          toast.error(loginResponse.message, {
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
      } else {
        toast.error(res.message, {
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

  const handlePasswordInputType = (event: React.MouseEvent<HTMLSpanElement>) => {
    setShowPass(!showPass)
    const input = event.currentTarget.previousElementSibling as HTMLInputElement

    if (input.type === 'password') {
      input.type = 'text'
    } else {
      input.type = 'password'
    }
  }

  const handleFocus = () => {
    setIsInputFocused(true)
  }
  const handleBlur = () => {
    setIsInputFocused(false)
  }
  useEffect(() => {
    const passwordInput = document.getElementById('password')

    passwordInput?.addEventListener('focus', handleFocus)
    passwordInput?.addEventListener('blur', handleBlur)

    return () => {
      passwordInput?.removeEventListener('focus', handleFocus)
      passwordInput?.removeEventListener('blur', handleBlur)
    }
  }, [])

  return (
        <>
            <div className={classNames(styles.registerContainer)}>
            <ToastContainer
                position='top-center'
                autoClose={false}
                hideProgressBar={true}
                rtl={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                theme={isDark ? 'dark' : 'light'}
                transition={Zoom}
            />

                <header className={styles.header}>
                    <FullLogo className={styles.logo} />
                </header>
                <div className={styles.main}>
                    <form className={styles.registerForm} onSubmit={handleRegister}>
                        <div className={styles.formTitle}>
                            <h2>Crea tu cuenta en NanoURL</h2>
                            <p>¿Ya tiene una cuenta? <a className={styles.anchor} href="/login">Iniciar sesión</a> </p>
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="email">
                                Correo electrónico
                                <input
                                    className={classNames(styles.input, { [variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light' })}
                                    type="email"
                                    id='email'
                                    name='email'
                                    required
                                />
                            </label>
                            <label htmlFor="">
                                Contraseña
                                <input
                                    className={classNames(styles.input, { [variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light' })}
                                    type="password"
                                    id='password'
                                    name='password'
                                    onChange={handlePasswordValidation}
                                    onFocus={handleFocus}
                                />
                                <span className={styles.showPassIcon} onClick={ handlePasswordInputType }>
                                    {
                                        showPass ? <EyeOffIcon color={isDark === 'dark' ? '#fff' : '#494a4f'} /> : <EyeIcon color={isDark === 'dark' ? '#fff' : '#494a4f'}/>
                                    }
                                </span>
                            </label>
                            <div>
                                    <PasswordValidationList validations={passwordValidation} isInputFocused={isInputFocused} />
                            </div>
                            <input className={styles.submitButton} type="submit" value="Crear cuenta" />
                        </div>
                    </form>
                </div>
                <div className={styles.sidePanel}>
                    Aqui va contenido
                </div>
            </div>
        </>
  )
}
