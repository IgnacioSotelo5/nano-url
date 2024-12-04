import { getUserPreferences } from '@/api/user/user-api'
import { Dispatch, ReactNode, SetStateAction, createContext, useCallback, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

interface ThemeContextType {
    isDark: string;
    setIsDark: Dispatch<SetStateAction<string>>;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDark: 'dark',
  setIsDark: () => {}
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [cookie, setCookie] = useCookies(['access_token', 'themePreference'])
  const [isDark, setIsDark] = useState(cookie.themePreference || 'dark')

  const fetchUserPreferences = useCallback(async () => {
    try {
      const res = await getUserPreferences()

      const { themePreference } = res?.data
      
      if (themePreference) {
        setIsDark(themePreference)
        setCookie('themePreference', themePreference, { path: '/' })
      }
    } catch (error) {
      throw new Error('Error al obtener las preferencias del usuario.')
    }
  }, [setCookie])

  useEffect(() => {
    const fetchPreferences = async () => {
      await fetchUserPreferences()
    }
    fetchPreferences()
  }, [fetchUserPreferences, setIsDark])

  return (
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
            {children}
        </ThemeContext.Provider>
  )
}
