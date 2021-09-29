import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private allertSubject = new BehaviorSubject<string>('');
  actualAllert = this.allertSubject.asObservable();

  constructor() {}

  newAllert(message: string): void {
    this.allertSubject.next(message);
  }



}
