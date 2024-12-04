import { getUser } from '@/api/user/user-api'
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

type User = {
    id: string
    name: string
    email:string
    filename?: string | null
    themePreference?: string | null,
    file: any
}

type UserContextProps = {
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {}
})

export function UserProvider ({ children } : {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await getUser()
      
      if (res.ok) {
        const userData: User = res.data
        setUser(userData)
      } else {
        setUser(null)
      }
    }
    getUserInfo()
  }, [])

  return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
  )
}
