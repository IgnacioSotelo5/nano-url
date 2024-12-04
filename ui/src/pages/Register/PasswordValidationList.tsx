import { CheckmarkIcon, CloseIcon } from '@/components/icons/Icons'
import classNames from 'classnames'
import styles from './passwordValidationList.module.css'
import { PasswordValidation } from './interface/PasswordValidation.interface'

export function PasswordValidationList ({ validations, isInputFocused }: {validations: PasswordValidation, isInputFocused: boolean}) {
  const validationDescription: Record<keyof PasswordValidation, string> = {
    length: '8 o más caracteres',
    uppercase: 'Una mayúscula',
    number: 'Un número',
    specialChar: 'Un carácter especial'
  }

  return (
        <ul className={classNames([isInputFocused ? styles.validationList : styles.hidden])}>
            {
                Object.entries(validations).map(([key, value]) => (
                    <li className={classNames(styles.validation, [value ? styles.completed : styles.pending])} key={key}>
                        <p className={styles.paragraph}>
                            {value ? <CheckmarkIcon /> : <CloseIcon />} <span>{validationDescription[key as keyof PasswordValidation]}</span>
                        </p>
                    </li>
                ))
            }
        </ul>
  )
}
