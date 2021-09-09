import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  token = this.authService.token;

  intercept(request: HttpRequest<unknown>,next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url == 'urldacontrollare') {
      const cloneReq = request.clone(
        {
          setHeaders: {
            Authorization: `${this.token}`
          }
        }
      )
      return next.handle(cloneReq)
    }

    return next.handle(request);
  }
}
