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
    let usrNotEncrypted;
    
    let pswEncrypted;
    let usrEncrypted

    if (request.body) {

      let body: any = request.body;
  
      pswNotEncrypted = body.psw;
      usrNotEncrypted = body.usr;

      let cloneReq = request.clone({
        body: {
          psw: sha256(pswNotEncrypted),
          usr: sha256(usrNotEncrypted)
        }
      })

      return next.handle(cloneReq)
    }

    return next.handle(request);
  }
}
