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
    let pswEncrypted;

    if (request.body) {

      let body: any = request.body;
      pswNotEncrypted = body.psw;

      

    }

    return next.handle(request);
  }
}
