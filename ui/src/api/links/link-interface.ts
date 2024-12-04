import { QRCode } from "../qrCodes/qr-code-interface"

export interface Link{
    id: string
    originalUrl: string
    shortUrl: string
    title: string
    customShortUrl: string
    domain: string
    created_at: Date
    user: {
        id: string
        name: string
        email: string
    }
    clicks: number,
    qrCode: QRCode
}
