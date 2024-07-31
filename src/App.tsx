import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import styles from './App.module.css'
import Home from './components/pages/Home/Home'
import LinkInBio from './components/pages/LinkInBio/LinkInBio'
import Links from './components/pages/Links/Links'
import { Login } from './components/pages/Login/Login'
import QRCodes from './components/pages/QRCodes/QR-Codes'
import { SearchInput } from './components/Search'
import { Sidebar } from './components/SideBar/SideBar'
import { ThemeToggleBtn } from './components/ToggleThemeBtn'
import { useTheme } from './hooks/useTheme'
import variables from '@/styles/variables.module.css'

const App = () => {
  const { isDark, toggleTheme } = useTheme()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<string>('')
  const [showRegister, setShowRegister] = useState<boolean>(false)

  const handleLogin = (username: string) => {
    // Aquí puedes agregar la lógica para autenticar al usuario
    setIsAuthenticated(true)
    setUser(username)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser('')
  }

  return (
    <div id='container' className={classNames(styles.container, { [variables.container]: isDark === 'dark' })}>
      {isAuthenticated ? (
        <>
          <Sidebar />
          <main className={styles.main}>
            <ThemeToggleBtn onClick={toggleTheme} />
            <SearchInput />
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/links' element={<Links />} />
              <Route path='/qr-codes' element={<QRCodes />} />
              <Route path='/pages' element={<LinkInBio />} />
              <Route path='*' element={<Navigate to='/home' />} />
            </Routes>
            <button className={styles.logout} onClick={handleLogout}>Logout</button>
          </main>
        </>
      ) : (
        <Login onLogin={handleLogin} />        
      )}
    </div>
  )
}

export default App
