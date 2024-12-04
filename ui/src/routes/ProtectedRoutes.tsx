import { SearchInput } from '@/components/Search'
import { Sidebar } from '@/components/SideBar/SideBar'
import { SidebarProvider } from '@/context/SidebarContext'
import { ToastProvider } from '@/context/ToastContext'
import { UserProvider } from '@/context/UserContext'
import { Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  return (
    <ToastProvider>
      <UserProvider>
        <SidebarProvider>
              <Sidebar />
              <main style={{
                flexGrow: 1,
                margin: '1rem',
                position: 'relative',
                overflow: 'scroll',
                overflowX: 'hidden',
                scrollbarWidth: 'none'
              }}>
                <SearchInput />
                <Outlet />
              </main>
        </SidebarProvider>
      </UserProvider>
    </ToastProvider>
  )
}

export default ProtectedRoutes
