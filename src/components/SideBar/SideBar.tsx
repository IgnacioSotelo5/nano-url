import classNames from 'classnames'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Dropdown } from './Dropdown'
import { SidebarItem } from './SideBarItem'
import { Avatar } from '../Avatar'
import { Button } from '../Button'
import { ArrowForwardIcon, FullLogo, HomeIcon, LinkIcon, ListIcon, Logo, PlusIcon, QRIcon } from '../Icons'
import button from '@/components/button.module.css'
import styles from '@/components/SideBar/Sidebar.module.css'
import { SidebarContext } from '@/context/sidebar'
import { useTheme } from '@/hooks/useTheme'
import variables from '@/styles/variables.module.css'

export function Sidebar (): JSX.Element {
  const { open, setOpen, dropdownState, setDropdownState } = useContext(SidebarContext)
  const {isDark} = useTheme()
  const location = useLocation()
  return (
        <>
        <button onClick={()=> { setOpen(!open) }} className={classNames(button.mobileMenuButton, { [button.closed]: !open })}>
            <span></span>
            <span></span>
            <span></span>
        </button>
        <nav className={classNames(styles.container, { [styles.open]: open, [styles.closed]: !open, [variables.darkContainerSidebar]: isDark === 'dark', [variables.lightContainerSidebar]: isDark === 'light' })}>
            <div className={classNames(styles.content, { [styles.open]: open, [styles.closed]: !open })}>
                <div className={classNames(styles.title, { [styles.open]: open, [styles.closed]: !open })}>
                    {open ? <FullLogo /> : <Logo />}
                </div>
                <Button onClick={() => setDropdownState(!dropdownState)} customClassName={classNames(button.primaryButton, { [button.open]: open, [button.closed]: !open})}>
                    {open ? 'Crear nuevo' : <PlusIcon />}
                </Button>
                <Dropdown items={['Enlace', 'Codigo QR', 'Pagina']} open={open} />
                <hr className={classNames(styles.separator, {[variables.separatorDark]: isDark === 'dark', [variables.separatorLight]: isDark === 'light'})} />
                <ul className={classNames(styles.listContainer, { [styles.open]: open, [styles.closed]: !open })}>
                    <Link to='/home'>
                        <SidebarItem icon={<HomeIcon />} text="Home" />
                    </Link>
                    <Link to='/links'>
                        <SidebarItem icon={<LinkIcon />} text="Enlaces" />
                    </Link>
                    <Link to='/qr-codes'>
                        <SidebarItem icon={<QRIcon />} text="Codigos QR" />
                    </Link>
                    <Link to='/pages'>
                        <SidebarItem icon={<ListIcon />} text="Paginas" />
                    </Link>
                </ul>
                <div className={classNames(styles.userItem, { [styles.open]: open, [styles.closed]: !open, [variables.userItemDark]: isDark === 'dark', [variables.userItemLight]: isDark === 'light' })}>
                    <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" alt="Avatar image" />
                    <span>Username</span>
                    <ArrowForwardIcon />
                </div>
            <button data-status={open ? 'true' : 'false'} onClick={() => { setOpen(!open) }} className={button.openButton}><ArrowForwardIcon /></button>
            </div>
        </nav>
        </>
  )
}
