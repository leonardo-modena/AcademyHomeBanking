import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminSubject = new BehaviorSubject<{nome: string, cognome: string}>({nome: 'mario', cognome: 'rossi'});
  actualAdmin = this.adminSubject.asObservable();
  
  constructor() { }

  changeAdmin(admin: {nome: string, cognome: string}): void{
    this.adminSubject.next(admin)
  }
  

}
