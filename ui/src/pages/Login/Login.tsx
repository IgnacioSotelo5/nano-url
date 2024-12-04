import classNames from 'classnames'
import { FormEvent, useState } from 'react'

import styles from './login.module.css'
import { useTheme } from '@/hooks/useTheme'
import variables from '@/styles/variables.module.css'
import { loginUser } from '@/api/auth/auth-api'
import { toast, ToastContainer, Zoom } from 'react-toastify'
import { CheckIcon, EyeIcon, EyeOffIcon, FullLogo } from '@/components/icons/Icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function Login () {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPass, setShowPass] = useState(false)
  const { setIsAuth, login } = useAuth()
  const { isDark } = useTheme()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const body = {
      email,
      password
    }
    try {
      const res = await loginUser(body)

	  if (res.ok) {
        toast.success('Inicio de sesion exitoso!', {
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

        setIsAuth(res.ok)

        setTimeout(() => {
          login()
          navigate('/home')
        }, 4000)
      }
    } catch (error) {
      toast.error('El correo electrónico o la contraseña son incorrectos. Inténtalo de nuevo.', {
        type: 'error',
        autoClose: false,
        position: 'top-center',
        style: {
          lineClamp: 2,
	      textWrap: 'pretty'

        }
      })
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

  return (
		<div className={styles.loginContainer}>

			<ToastContainer
				closeButton={false}
				position='top-center'
				autoClose={false}
				hideProgressBar={true}
				rtl={false}
				closeOnClick
				pauseOnFocusLoss
				draggable
				theme={isDark}
				transition={Zoom}
				style={{ lineClamp: 2, textWrap: 'wrap', width: 420 }}
			/>
			<header className={styles.header}>
				<FullLogo className={styles.logo} />
			</header>
			<div className={styles.main}>

			<form className={styles.loginForm} onSubmit={handleSubmit}>
				<div className={styles.formTitle}>
					<h2>Conectate y comienza a compartir tus enlaces</h2>
					<p>
						¿Aún no tienes una cuenta? <a className={styles.anchor} href="/register">Regístrate</a>
					</p>
				</div>
				<div className={styles.inputContainer}>
					<label>
            			Correo electrónico
						<input
							className={classNames(styles.input, { [variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light' })}
 							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							name='email'
						/>
					</label>
					<label>
            			Contraseña
						<input
							className={classNames(styles.input, { [variables.inputDark]: isDark === 'dark', [variables.inputLight]: isDark === 'light' })}
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							name='password'
							/>
						<span className={styles.showPassIcon} onClick={ handlePasswordInputType }>
							{
								showPass ? <EyeOffIcon color={isDark === 'dark' ? '#fff' : '#494a4f'} /> : <EyeIcon color={isDark === 'dark' ? '#fff' : '#494a4f'}/>
							}
						</span>
					</label>
					<button className={styles.submitButton} type="submit">Login</button>
				</div>
			</form>

			</div>
			<div className={styles.sidePanel}>
                Aqui va contenido
            </div>
		</div>
  )
}
