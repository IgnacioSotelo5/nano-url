import { getIsAuth } from '@/api/auth/auth-api'
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

type AuthContextProps = {
    isAuth: boolean | null
    setIsAuth: Dispatch<SetStateAction<boolean | null>>
    login: () => void
    logout: () => void
}

// crear el contexto
export const AuthContext = createContext<AuthContextProps>({
  isAuth: false,
  setIsAuth: () => {},
  login: () => {},
  logout: () => {}
})

// proveer el contexto

export default function AuthProvider ({ children }: {children: ReactNode}) {
  const [isAuth, setIsAuth] = useState<boolean | null>(() => {
    const storedValue = localStorage.getItem('isAuth')
    return storedValue === 'true' ? true : storedValue === 'false' ? false : null
  })

  useEffect(() => {
    async function getAuth () {
      try {
        const res = await getIsAuth()
                
        if (res.ok) {
          setIsAuth(true)
          localStorage.setItem('isAuth', 'true')
        } else {
          setIsAuth(false)
          localStorage.setItem('isAuth', 'false')
        }
      } catch (error) {
        setIsAuth(false)
        localStorage.setItem('isAuth', 'false')
      }
    }
    getAuth()
  }, [])

  const login = () => {
    setIsAuth(true)
    localStorage.setItem('isAuth', 'true')
  }
  const logout = () => {
    setIsAuth(false)
    localStorage.setItem('isAuth', 'false')
  }

  return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
  )
}
