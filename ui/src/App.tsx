import { useEffect } from 'react' 
import { AppRoutes } from './routes/AppRoutes' 
import { useAuth } from './hooks/useAuth' 
import 'react-toastify/dist/ReactToastify.css' 
import { useTheme } from './hooks/useTheme' 

const App = () => {
  const { isAuth } = useAuth() 
  const { isDark } = useTheme() 

  useEffect(() => { 
    const themePreference = isDark
    document.documentElement.classList.add(themePreference) 
  }, []) 
  
  return ( 
    <div id='container' className='bg-[#F4F6FA] h-full flex justify-center dark:bg-[#0f0f0f] dark:text-[#fff] '>
      <AppRoutes isLogged={isAuth} /> 
    </div>
  ) 
} 
   
export default App
