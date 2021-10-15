import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    //Run something before the request is handled
    //by the request handler

    return handler.handle().pipe(
      map((data): any => {
        // Run something before the response is sent out
        // excludeExtraneosValues strips out the props that are not in the dto
        return plainToClass(this.dto, data, { excludeExtraneousValues: true });
      }),
    );
  }
}
