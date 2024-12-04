import classNames from 'classnames'

import { SearchIcon } from './icons/Icons'
import styles from './search.module.css'
import { useTheme } from '@/hooks/useTheme'
import variables from '@/styles/variables.module.css'
export function SearchInput (): JSX.Element {
  const { isDark } = useTheme()
  return (
		<form className={styles.inputField} action="">
			<label htmlFor="search">
				<SearchIcon className={styles.searchIcon} />
				<input autoComplete='off' className={classNames(styles.input, {
				  [variables.inputDark]: isDark === 'dark',
				  [variables.light]: isDark === 'light'
				})} type="search" id='search' name='search' placeholder='Search...' />
			</label>
			<button className={styles.submit} type='submit'>
			</button>
		</form>
  )
}
