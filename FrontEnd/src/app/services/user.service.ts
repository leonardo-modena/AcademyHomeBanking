import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";

const apiUrl = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new BehaviorSubject<{nome: string, cognome: string, dataDiNascita: number, email: string, id: string}>({nome: 'Samuel', cognome: 'Monti', dataDiNascita: 756428400000, email: 'samuelmonti@gmail.com', id: 'C1'});

  userBills!: any[];
  constructor() {

  }

  // GET REQUESTS

  getUser(id: number) {
    //get
  }

  //Restituisce il saldo del cliente
  getBalance(/*bill: number*/)/*: Observable<number>*/ {
    return 40.23
  }

  // Restituisce la lista delle operazioni che
  // sono state fatte nel periodo specificato
  getOperationList(filterInfo: {type: 'last3' | 'last10' | 'dateSelection', startDate?: number, endDate?: number}) {
    if (filterInfo.type === 'dateSelection') {
      // get
    }
    else if (filterInfo.type === 'last3') {
      // get
    }
    else {
      // get
    }

  }

  // Restituisce i dati del conto
  getBillInformation(bill: number) {
    //get

  }

  //POST REQUESTS

  //Creazione di un nuovo conto
  createNewBill() {
    // post
  }

  doDeposit(bill: number, amount: number) {
    // post
  }

  doTaking(bill: number, amount: number) {
    // post
  }

  //DELETE REQUESTS

  deleteBill(bill: number) {
    // delete
  }
}
