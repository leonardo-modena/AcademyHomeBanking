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

  token = this.authService.token;

  intercept(request: HttpRequest<unknown>,next: HttpHandler): Observable<HttpEvent<unknown>> {

    const headers = new HttpHeaders({
      'Authorization': `${this.token}`,
    });

    if (!request.url.includes('/signin') && !request.url.includes('/signup')) {
      const cloneReq = request.clone(
        {headers}
      )
      return next.handle(cloneReq)
    }

    return next.handle(request);
  }
}
