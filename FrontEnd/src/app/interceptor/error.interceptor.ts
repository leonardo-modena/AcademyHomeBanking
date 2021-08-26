import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { ErrorService } from '../services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorString: string;

        if ((error.error instanceof ErrorEvent)) {
          errorString = `Error: ${error.error.message}`
        }else{
          errorString = `Error - error status: ${error.status} | error message ${error.message}`
        }

        this.errorService.newError(errorString);
        return throwError(errorString);
      })
    )
  }
}
