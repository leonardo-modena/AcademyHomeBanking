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

  token!: string;

  constructor(private authService: AuthService) {
    this.authService.tokenSubject.subscribe((token) => {
      this.token = token;
    })
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    while (!request.url.includes('/signup') && !request.url.includes('/signin')) {
      if (this.token) {
        const headers = new HttpHeaders({
          Authorization: `${this.token}`,
        });

        if (request.url.includes('/customer') || request.url.includes('/admin') || request.url.includes('/bankAccount')) {
          const cloneReq = request.clone({headers});
          return next.handle(cloneReq);
        }
      }
    }

    return next.handle(request);
  }
}
