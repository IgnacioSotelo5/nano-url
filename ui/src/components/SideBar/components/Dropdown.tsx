import classNames from 'classnames'
import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'

import styles from './dropdown.module.css'
import { LinkIcon, PageIcon, QRIcon } from '@/components/icons/Icons'
import { useTheme } from '@/hooks/useTheme'
import variables from '@/styles/variables.module.css'

type ItemKey = 'Enlace' | 'Codigo QR' | 'Página';

export function Dropdown ({ items, open, dropdownState, setDropdownState } : {items: ItemKey[], open: boolean, dropdownState: boolean, setDropdownState: Dispatch<SetStateAction<boolean>>}) {
  const { isDark } = useTheme()
  const itemsIcons: Record<ItemKey, JSX.Element> = {
    Enlace: <LinkIcon />,
    'Codigo QR': <QRIcon />,
    Página: <PageIcon />
  }
  const pathRecord: Record<ItemKey, string> = {
    Enlace: 'links',
    'Codigo QR': 'qr-codes',
    Página: 'pages'
  }

  return (
		<ul className={classNames(styles.dropdown, styles.dropdownClose, { [styles.closed]: !open, [styles.dropdownClose]: !dropdownState, [styles.dropdownOpen]: dropdownState, [variables.darkDropdown]: isDark === 'dark', [variables.lightDropdown]: isDark === 'light' })}>
			{

              items.map((item) => (
                <Link key={item} onClick={() => setDropdownState(!dropdownState)} to={`/${pathRecord[item]}`}>
                  <li className={classNames(styles.dropdownItem, { [variables.darkDropdownItem]: isDark === 'dark', [variables.lightDropdownItem]: isDark === 'light' })}>
                    {itemsIcons[item]}
                    {item}
                  </li>
                </Link>
              ))

      }
		</ul>
  )
}
