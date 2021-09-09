import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  token = sessionStorage.getItem('token');

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const headers = new HttpHeaders({
      Authorization: `${this.token}`,
    });

    console.log(request.url);
    if (request.url.includes('/customer') || request.url.includes('/admin') || request.url.includes('/bankAccount')) {
      const cloneReq = request.clone({headers});
      return next.handle(cloneReq);
    }

    return next.handle(request);
  }
}
