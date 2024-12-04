import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { InvalidationTokenService } from "./token-invalidation.service";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private invalidationTokenService: InvalidationTokenService,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        //Verificar si el endpoint es publico
        const isPublicHandler = this.reflector.get<boolean>('isPublic', context.getHandler())
        const isPublicController = this.reflector.get<boolean>('isPublic', context.getClass())
        
        if(isPublicHandler || isPublicController){
            return true
        }

        // Obtenemos la request del contexto de ejecución
        const request = context.switchToHttp().getRequest();
        // Extraemos el token de la request usando una función helper
        const token = this.extractTokenFromCookie(request);        
        
        if (!token || await this.invalidationTokenService.isTokenInvalidated(token)) {
            // Si no hay token, lanzamos una excepción de autorización
            throw new UnauthorizedException();
        }
        
        try {
            // Decodificamos y validamos el token, pasándole el token y el secreto extraído de las variables de entorno
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET_KEY,
            })
                        
            // Adjuntamos el payload a una nueva propiedad 'user' en la request para poder acceder a él desde cualquier ruta
            request['user'] = payload;
            // Devolvemos true para habilitar el acceso a la ruta
            return true;
        } catch (error) {            
            // Si el token no es válido, lanzamos una excepción de autorización
            throw new UnauthorizedException();
        }
    }

    private extractTokenFromCookie(request: Request): string | undefined {
        const {access_token} = request.cookies
    
        return access_token ? access_token : undefined
    }
}
