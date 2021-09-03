import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
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

  user = new BehaviorSubject<User>({password: 'djkfsdjf!4', firstName: 'Samuel', lastName: 'Caio', gender: 'M', role: 'ROLE_C', dateOfBirth: 1126389600000, email: 'samuelcaio@gmail.com', id: '1', bankAccounts: [1, 2]});

  userBills!: any[];
  constructor(private http: HttpClient) {
     this.getUser(2);
  }

  // GET REQUESTS

  getUser(id: number) {
    // this.user.next({password: 'djkfsdjf!4', firstName: 'Samuel', lastName: 'Caio', gender: 'M', role: 'ROLE_C', dateOfBirth: 1126389600000, email: 'samuelcaio@gmail.com', id: '1', bankAccounts: [1, 2]});
    this.http.get<User>(`${this.apiUrl}/profile/${id}`).subscribe((user) => {
      console.log(user);
      this.user.next(user);
    });
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
    return this.http.get<Operation[]>(`${this.apiUrl}/profile/bankAccount/${bill}`).subscribe((resData) => {
      console.log(resData);
    });
  }

  //POST REQUESTS

  //Creazione di un nuovo conto
  createNewBill(initialAmount: number, startBillNumber: number) {
    console.log(startBillNumber);
    return this.http.post<BankAccount>(`${this.apiUrl}/new/${startBillNumber}/${initialAmount}`, {});
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
