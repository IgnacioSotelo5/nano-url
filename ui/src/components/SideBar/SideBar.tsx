import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Dropdown } from './components/Dropdown'
import { SidebarItem } from './SideBarItem'
import { Avatar } from './components/Avatar'
import { Button } from '../Button'
import { ArrowForwardIcon, FullLogo, HomeIcon, LinkIcon, PageIcon, Logo, PlusIcon, QRIcon } from '../icons/Icons'
import button from '@/components/button.module.css'
import styles from '@/components/SideBar/Sidebar.module.css'
import { SidebarContext } from '@/context/SidebarContext'
import { useTheme } from '@/hooks/useTheme'
import variables from '@/styles/variables.module.css'
import { useUser } from '@/hooks/useUser'

export function Sidebar (): JSX.Element {
  const { open, setOpen } = useContext(SidebarContext)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [dropdownState, setDropdownState] = useState(false)
  const { isDark } = useTheme()
  const { user } = useUser()
  const [profileImg, setProfileImg] = useState('')

  useEffect(() => {
    if (user) {
      setProfileImg(user.filename!)
    }
  }, [user])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
	
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleItemsClick = () => {
    if (isMobile) {
      setOpen(!open)
    }
  }
  
  return (
		<>
			<button onClick={() => { setOpen(!open) }} className={classNames(button.mobileMenuButton, { [button.open]: open })}>
				<span></span>
				<span></span>
				<span></span>
			</button>
			<nav className={classNames(styles.container, { [styles.open]: open, [styles.closed]: !open, [variables.darkContainerSidebar]: isDark === 'dark', [variables.lightContainerSidebar]: isDark === 'light' })}>
				<div className={classNames(styles.content, { [styles.open]: open, [styles.closed]: !open })}>
					<div className={classNames(styles.title, { [styles.open]: open, [styles.closed]: !open })}>
						{open ? <FullLogo /> : <Logo />}
					</div>
					<Button onClick={() => setDropdownState(!dropdownState)} customClassName={classNames(button.primaryButton, { [button.open]: open, [button.closed]: !open }, 'text-base')}>
						{open ? 'Crear nuevo' : <PlusIcon />}
					</Button>
					<Dropdown dropdownState={dropdownState} setDropdownState={setDropdownState} items={['Enlace', 'Codigo QR', 'Página']} open={open} />
					<hr className={classNames(styles.separator, { [variables.separatorDark]: isDark === 'dark', [variables.separatorLight]: isDark === 'light' })} />
					<ul className={classNames(styles.listContainer, { [styles.open]: open, [styles.closed]: !open })}>
						<Link onClick={handleItemsClick} to='/home' >
							<SidebarItem icon={<HomeIcon />} text="Home" />
						</Link>
						<Link onClick={handleItemsClick} to='/links' >
							<SidebarItem icon={<LinkIcon />} text="Enlaces" />
						</Link>
						<Link onClick={handleItemsClick} to='/qr-codes' >
							<SidebarItem icon={<QRIcon />} text="Codigos QR" />
						</Link>
						<Link onClick={handleItemsClick} to='/pages' >
							<SidebarItem icon={<PageIcon />} text="Páginas" />
						</Link>
					</ul>
					<div className={classNames(styles.userItem, { [styles.open]: open, [styles.closed]: !open, [variables.userItemDark]: isDark === 'dark', [variables.userItemLight]: isDark === 'light' })}>
						<Avatar src={`http://localhost:3000/users/profile-img/${profileImg}`} alt="Avatar image" />
						<span>{user?.name ? user.name : 'User'}</span>
						<ArrowForwardIcon />
					</div>
					<button data-status={open ? 'true' : 'false'} onClick={() => { setOpen(!open) }} className={button.openButton}><ArrowForwardIcon /></button>
				</div>
			</nav>
		</>
  )
}
