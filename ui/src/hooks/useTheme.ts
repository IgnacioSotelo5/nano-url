// hooks/useTheme.js
import { useContext } from 'react'

import { ThemeContext } from '../context/ThemeContext'

export const useTheme = () => {
  const { isDark, setIsDark } = useContext(ThemeContext)
  const toggleTheme = () => {
    setIsDark((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return { isDark, toggleTheme }
}
