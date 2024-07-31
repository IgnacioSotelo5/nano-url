import classNames from "classnames"
import { InputHTMLAttributes, useState } from "react"

import styles from './checkbox.module.css'
import { QRPreview } from "../../QRCodes/components/PreviewQR"
import { usePreview } from "@/hooks/usePreview"

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement>{
    htmlFor: string
}
export function Checkbox({htmlFor, ...rest}: CheckboxProps) {
    const [isChecked, setIsChecked] = useState(false)
    const {url} = usePreview()
    const handleChange = () => {
        setIsChecked(!isChecked)
    }
    return(
        <div className={styles.qrPreview}>
            <label id='qr-check' className={classNames(styles.checkboxStyle, { [styles.checked]: isChecked })} htmlFor={htmlFor}>
                <input onChange={handleChange} type="checkbox" {...rest} className={styles.checkboxInput} id={htmlFor} />
                <span className={styles.checkboxSpan}></span>
            </label>
            {
                isChecked ? 
                (<QRPreview url={url} />)
                : 
                (null)
            }
        </div>
    )
}