import { Navigate, Outlet } from 'react-router-dom'

interface RequiereAuthProps{
    isLogged: boolean | null
}
export function RequireAuth ({ isLogged }: RequiereAuthProps) {
  const publicRoutes = ['/login', '/register']

  if (isLogged === null) {
    return <div>Verificando permisos...</div>
  }
  
  if (!isLogged && !publicRoutes.includes(window.location.pathname)) {
    return <Navigate to={'/login'}/>
  }

  return <Outlet />
}
