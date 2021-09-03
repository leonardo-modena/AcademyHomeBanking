import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Operation} from "../model/operation";
import {BankAccount} from "../model/BankAccount";

import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl =`${environment.api_url}/customer`;

  user = new BehaviorSubject<{nome: string, cognome: string, dataDiNascita: number, email: string, id: string}>({nome: 'Samuel', cognome: 'Monti', dataDiNascita: 756428400000, email: 'samuelmonti@gmail.com', id: 'C1'});

  userBills!: any[];
  constructor(private http: HttpClient) { }

  // GET REQUESTS

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/id`);
  }

  //Restituisce il saldo del cliente
  getBalance(bill: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/balance/${bill}`);
  }

  // Restituisce la lista delle operazioni che
  // sono state fatte nel periodo specificato
  getOperationList(bill: number, filterInfo: {type: 'last3' | 'last10' | 'dateSelection', startDate?: number, endDate?: number}): Observable<Operation[]> {
    if (filterInfo.type === 'dateSelection') {
      return this.http.get<Operation[]>(`${this.apiUrl}/...`);
    }
    else if (filterInfo.type === 'last3') {
      return this.http.get<Operation[]>(`${this.apiUrl}/...`);
    }
    else {
      return this.http.get<Operation[]>(`${this.apiUrl}/...`);
    }
  }

  // Restituisce i dati del conto
  getBillInformation(bill: number) {
    return this.http.get<Operation[]>(`${this.apiUrl}/...`);
  }

  //POST REQUESTS

  //Creazione di un nuovo conto
  createNewBill(initialAmount: number, startBillNumber: number) {
    return this.http.post<BankAccount>(`${this.apiUrl}/new`, {startBill: startBillNumber, initialAmount: 12});
  }

  // Versamento sul conto
  doDeposit(bill: number, operation: Operation) {
    return this.http.post<Operation[]>(`${this.apiUrl}/...`, {bill, operation});
  }

  // Prelievo dal conto
  doTaking(bill: number, operation: Operation) {
    return this.http.post<Operation[]>(`${this.apiUrl}/...`, {bill, operation});
  }

  //DELETE REQUESTS

  // Cancellazione del conto
  deleteBill(bill: number): Observable<void> {
    return this.http.put<void>(`${environment.api_url}/closingRequest/1`, {});
  }
}
