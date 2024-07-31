import classNames from 'classnames'
import { FormEvent, useState } from 'react'

import styles from './login.module.css'
import { useTheme } from '@/hooks/useTheme'
import variables from '@/styles/variables.module.css'

interface LoginProps {
  onLogin: (username: string) => void;
}

export function Login ({ onLogin }: LoginProps){
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { isDark } = useTheme()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Aquí puedes agregar lógica para verificar las credenciales
    onLogin(username)
  }

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              className={classNames({[variables.dark]: isDark === 'dark'})}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              className={classNames({[variables.dark]: isDark === 'dark'})}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
};
