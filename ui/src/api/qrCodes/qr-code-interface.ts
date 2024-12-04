import { Link } from "../links/link-interface"

export interface QRCode {
    id: string
    qrImageFilename: string
    link: Link
}