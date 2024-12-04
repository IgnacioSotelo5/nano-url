import { Request } from "express"

export interface AuthRequest extends Request{
    user:{
        id: string,
        name: string | null,
        email: string | null,
        filename: string | null,
        iat: number,
        exp: number
    }
}