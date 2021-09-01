import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { sha256 } from 'js-sha256';

@Injectable()
export class EncryptInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let pswNotEncrypted;

    let body: any = request.body;

    if (body && body.password) {

      pswNotEncrypted = body.password;

      let cloneReq = request.clone({
        body: {
          password: sha256(pswNotEncrypted),
          firstName: body.firstName,
          lastName: body.lastname,
          email: body.email,
          dateOfBirth: body.dateOfBirth,
          gender: body.gender,
        }
      })

      return next.handle(cloneReq)
    }

    return next.handle(request);
  }
}
