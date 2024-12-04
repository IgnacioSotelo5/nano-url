import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { catchError, map, Observable, throwError } from "rxjs";

export interface Response<T>{
    statusCode: number
    message: string
    ok: boolean,
    timestamp: string
    path: string
    data: T | null
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>>{
    constructor(private reflector: Reflector){}
    
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>>{
        const isRedirectResponse = this.reflector.get<boolean>('isRedirection', context.getHandler())
        const request = context.switchToHttp().getRequest()
        const response = context.switchToHttp().getResponse()
        const statusCode = response.statusCode as number

        if(isRedirectResponse){
            return next.handle()
        }

        return next.handle().pipe(
            map(data => ({
                statusCode,
                message: statusCode >= 400 ? 'Error' : 'Success',
                ok: statusCode >= 400 ? false : true,
                timestamp: new Date().toISOString(),
                path: request.url,
                data
            })),
            catchError(error => {
                const statusCode = error instanceof HttpException ? error.getStatus() : 500
                const errorResponse = {
                    statusCode,
                    message: error.message || 'Internal server error.',
                    ok: false,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: error
                }
                return throwError(() => new HttpException(errorResponse, statusCode))
            }))
        
    }
}