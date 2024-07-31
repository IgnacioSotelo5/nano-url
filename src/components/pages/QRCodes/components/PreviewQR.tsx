import classNames from "classnames"
import { QRCodeSVG } from "qrcode.react"

import { useTheme } from "@/hooks/useTheme"
import variables from '@/styles/variables.module.css'

export function QRPreview({url}: {url: string}){
    const {isDark} = useTheme()
    return(
        <div>
            <QRCodeSVG className={classNames({[variables.darkQRPreview]: isDark === 'dark', [variables.lightQRPreview]: isDark === 'light'})} size={260} value={url}/>
        </div>
    )
}