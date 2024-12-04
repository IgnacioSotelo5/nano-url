import classNames from 'classnames'
import { InputHTMLAttributes, useState } from 'react'

import styles from './checkbox.module.css'
import { QRPreview } from '../../QRCodes/components/PreviewQR'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement>{
    htmlFor: string
	url?: string
}
export function Checkbox ({ htmlFor, url = 'http://localhost:3000', ...rest }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false)
  const handleChange = () => {
    setIsChecked(!isChecked)
  }
  return (
		<div className={styles.qrPreview}>
			<label id='qr-check' className={classNames(styles.checkboxStyle, { [styles.checked]: isChecked })} htmlFor={htmlFor}>
				<input name={htmlFor} onChange={handleChange} type="checkbox" {...rest} className={styles.checkboxInput} id={htmlFor} />
				<span className={styles.checkboxSpan}></span>
			</label>
			{
				isChecked
				  ? (<QRPreview url={url} />)
				  : 					(null)
			}
		</div>
  )
}
