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
  apiUrlCustomer =`${environment.api_url}/customer`;
  apiUrlBankAccount =`${environment.api_url}/bankAccount`;

  private userSubject = new BehaviorSubject<User>({firstName: '', lastName: '', dateOfBirth: 0, email: '', gender: '', id: '', role: 'ROLE_C', bankAccounts: [], password: '' });
  user = this.userSubject.asObservable();

  private bankAccountsSubject = new BehaviorSubject<BankAccount[]>([]);
  bankAccounts = this.bankAccountsSubject.asObservable();

  private operationsSubject = new BehaviorSubject<Operation[]>([]);
  operations = this.operationsSubject.asObservable();

  private operationSpinnerSubject = new BehaviorSubject<boolean>(false);
  operationsSpinner = this.operationSpinnerSubject.asObservable();

  private inactiveUserSubject = new BehaviorSubject<boolean>(false);
  inactiveUser = this.inactiveUserSubject.asObservable();

  private closingAccountSubject = new BehaviorSubject<boolean>(false);
  closingAccount = this.closingAccountSubject.asObservable();

  constructor(private http: HttpClient) { }

  // GET REQUESTS

  getUser(id: number): void {

    this.http.get<{id: string;
      firstName: string;
      lastName: string;
      email: string;
      dateOfBirth: number;
      gender: string;
      role: string;
      bankAccounts: BankAccount[]}
      >(`${this.apiUrlCustomer}/profile/${id}`).subscribe((userInfo) => {
        const user: User = {id: userInfo.id, firstName: userInfo.firstName, lastName: userInfo.lastName, email: userInfo.email, dateOfBirth: userInfo.dateOfBirth, role: userInfo.role, gender: userInfo.gender, bankAccounts: userInfo.bankAccounts.map((bill) => { return parseInt(bill.id)})  }

        this.userSubject.next(user);

        const bankAccounts: BankAccount[] = userInfo.bankAccounts.map((bill) => {
          return {...bill, holder: user}
      });

        if (bankAccounts.length === 0) {
          // Conto in fase di chiusura
          this.closingAccountSubject.next(true);
        }
        else {

          if(bankAccounts.length === 1 && bankAccounts[0].account_status === 'INACTIVE') {
            this.inactiveUserSubject.next(true);
          }
          this.bankAccountsSubject.next(bankAccounts);

          this.getOperationList(this.userSubject.getValue().bankAccounts[0], {type: 'lastTen', startDate: 0, endDate: 0});
        }

    });
  }

  //Restituisce il saldo del cliente
  getBalance(bill: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrlBankAccount}/balance/${bill}`);
  }

  // Restituisce la lista delle operazioni che
  // sono state fatte nel periodo specificato
  getOperationList(bill: number, filterInfo: {type: 'lastTen' | 'lastThreeMonths' | 'betweenTwoDates', startDate: number, endDate: number}): void {
    this.operationSpinnerSubject.next(true);
    this.http.get<{id: number, type:  'WITHDRAWAL' | 'DEPOSIT', causal: string, amount: number, dateTransaction: number, id_account: {id: number, balance: number, account_status: string}}[]>(`${this.apiUrlBankAccount}/transactions/${bill}/${filterInfo.type}/${filterInfo.startDate}/${filterInfo.endDate}`)
      .subscribe((operations) => {
        console.log(operations);
        let operationsList: Operation[] = operations.map((op) => {
          return {causal: op.causal, type: op.type, amount: op.amount, dateTransaction: op.dateTransaction, idAccount: op.id_account.id, idTransaction: op.id, }
        })
        this.operationsSubject.next(operationsList);
        this.operationSpinnerSubject.next(false);
      }, () => {
        this.operationSpinnerSubject.next(false);
      });
  }

  // Restituisce i dati del conto
  getBillInformation(bill: number): Observable<BankAccount> {
    return this.http.get<BankAccount>(`${this.apiUrlCustomer}/profile/bankAccount/${bill}`);
  }

  //POST REQUESTS

  //Creazione di un nuovo conto
  createNewBill(initialAmount: number, startBillNumber: string): Observable<BankAccount> {
    return this.http.post<BankAccount>(`${this.apiUrlCustomer}/new/${startBillNumber}/${initialAmount}`, {});
  }

  // Versamento sul conto
  doDeposit(bill: number, amount: number, causal: string) {
    return this.http.post<any>(`${this.apiUrlBankAccount}/deposit/${amount}/${causal}/${bill}`, {});
  }

  // Prelievo dal conto
  doWithdrawal(bill: number, amount: number, causal: string) {
     return this.http.post<any>(`${this.apiUrlBankAccount}/withdrawal/${amount}/${causal}/${bill}`, {});
  }

  //DELETE REQUESTS

  // Cancellazione del conto
  deleteBill(bill: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrlCustomer}/closingRequest/${bill}`, {});
  }
}
