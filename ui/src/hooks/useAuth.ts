import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'

export function useAuth () {
  const { isAuth, setIsAuth, login, logout } = useContext(AuthContext)
  return { isAuth, setIsAuth, login, logout }
}
