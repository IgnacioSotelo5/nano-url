type User = {
    id: string
    name: string
    email: string
}

type QrCode = {
    id: string
    qrImageFilename: string
}

//interfaz para traer los Links con sus relaciones como el numero de clicks y el usuario
export interface LinksWithRelations{
    id: string, 
    title?: string
    originalUrl: string
    shortUrl: string
    customShortUrl: string
    domain: string
    created_at: Date
    user: User
    clicks: number
    qrCode: QrCode
}