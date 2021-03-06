import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { sha256 } from 'js-sha256';

@Injectable()
export class EncryptInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let pswNotEncrypted;

    let body: any = request.body;

    if (request.url.includes('signup')) {
      pswNotEncrypted = body.password;

      let cloneReq = request.clone({
        body: {
          password: sha256(pswNotEncrypted),
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          dateOfBirth: body.dateOfBirth,
          gender: body.gender,
        },
      });

      return next.handle(cloneReq);
    } else if (request.url.includes('signin')) {
      pswNotEncrypted = body.password;
      let cloneReq = request.clone({
        body: {
          username: body.username,
          password: sha256(pswNotEncrypted),
        },
      });
      return next.handle(cloneReq);
    }

    return next.handle(request);
  }
}
