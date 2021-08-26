import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private errorSubject = new BehaviorSubject<string>('');
  error = this.errorSubject.asObservable();

  constructor() { }

  newError(errorMessage: string): void {
    this.errorSubject.next(errorMessage);
  }
  

}
