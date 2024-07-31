import classNames from "classnames"
import { InputHTMLAttributes } from "react"

import { MoonIcon, SunIcon } from "./Icons"
import styles from '@/components/toggleThemeBtn.module.css'

export function ThemeToggleBtn ({...rest}: InputHTMLAttributes<HTMLInputElement>){
    return (
        <label aria-label="checked" id='theme-check' className={classNames(styles.checkboxStyle)} htmlFor='theme-checkbox'>
            <input {...rest} type="checkbox" className={styles.checkboxInput} id='theme-checkbox' />
            <span className={styles.checkboxSpan}></span>
            <div className={styles.icons}>
                <MoonIcon />
                <SunIcon />
            </div>
        </label>
    )
}