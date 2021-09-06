import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Operation} from "../model/operation";
import {BankAccount} from "../model/BankAccount";

import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl =`${environment.api_url}/customer`;

  private userSubject = new BehaviorSubject<User>({firstName: 'Nome', lastName: 'cognome', dateOfBirth: 1630936744610, email: 'prova@gmail.com', gender: 'F', id: '1', role: 'ROLE_C', bankAccounts: [], password: 'hdf' });
  user = this.userSubject.asObservable();

  private bankAccountsSubject = new BehaviorSubject<BankAccount[]>([]);
  bankAccounts = this.bankAccountsSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
     this.getUser(2);
  }

  // GET REQUESTS

  getUser(id: number) {

    this.http.get<User>(`${this.apiUrl}/profile/${id}`).subscribe((user) => {
      this.userSubject.next(user);
      if (user.bankAccounts.length === 0) {
        this.authService.logout();
      }
    });
  }

  //Restituisce il saldo del cliente
  getBalance(bill: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/balance/${bill}`);
  }

  // Restituisce la lista delle operazioni che
  // sono state fatte nel periodo specificato
  getOperationList(/*bill: number, filterInfo: {type: 'last3' | 'last10' | 'dateSelection', startDate?: number, endDate?: number}*/): Observable<any> {
    return this.http.get(`${this.apiUrl}/operation/${2}`);

    /*if (filterInfo.type === 'dateSelection') {
      return this.http.get<Operation[]>(`${this.apiUrl}/...`);
    }
    else if (filterInfo.type === 'last3') {
      return this.http.get<Operation[]>(`${this.apiUrl}/...`);
    }
    else {
      return this.http.get<Operation[]>(`${this.apiUrl}/...`);
    }*/
  }

  // Restituisce i dati del conto
  getBillInformation(bill: number): Observable<BankAccount> {
    return this.http.get<BankAccount>(`${this.apiUrl}/profile/bankAccount/${bill}`);
  }

  //POST REQUESTS

  //Creazione di un nuovo conto
  createNewBill(initialAmount: number, startBillNumber: string) {
    return this.http.post<BankAccount>(`${this.apiUrl}/new/${startBillNumber}/${initialAmount}`, {});
  }



  // Versamento sul conto
  doDeposit(bill: number, amount: number) {
    return this.http.post<any>(`${this.apiUrl}/deposit/${amount}/${bill}`, {});
  }

  // Prelievo dal conto
  doWithdrawal(bill: number, amount: number) {
    return this.http.post<any>(`${this.apiUrl}/withdrawal/${amount}/${bill}`, {});
  }

  //DELETE REQUESTS

  // Cancellazione del conto
  deleteBill(bill: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/closingRequest/${bill}`, {});
  }
}
