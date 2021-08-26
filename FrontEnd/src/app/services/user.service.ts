import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new BehaviorSubject<{nome: string, cognome: string, dataDiNascita: number, email: string, id: string}>({nome: 'Samuel', cognome: 'Monti', dataDiNascita: 756428400000, email: 'samuelmonti@gmail.com', id: 'C1'});

  userBills!:any;
  constructor() {

  }


  //Restituisce il saldo del cliente
  getBalance(/*billNumber: number*/)/*: Observable<number>*/ {
    return 40.23
  }

  //Creazione di un nuovo conto
  createNewBill()/*: Observable<any>*/ {
    // post
  }

}
