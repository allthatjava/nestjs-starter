import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { instanceToPlain } from "class-transformer";
import { map, Observable } from "rxjs";

// Interceptor will tranform the response with following condition
@Injectable()
export class TransformInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe( map(data => instanceToPlain(data)));
    }
}

