import { CallHandler, ExecutionContext, HttpStatus, NestInterceptor } from "@nestjs/common";
import { Response } from "express";
import { Observable, tap } from "rxjs";

export class RedirectInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>{

        return next.handle().pipe(tap((data) => {
            const response: Response = context.switchToHttp().getResponse()
            if(data && data.statusCode === HttpStatus.MOVED_PERMANENTLY){
                return response.redirect(data.statusCode, data.url)
            }
        }))
    }

}