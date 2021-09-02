import { environment } from 'src/environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../model/user';
import { BankAccount } from '../model/account';
const apiUrl = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminSubject = new BehaviorSubject<{nome: string, cognome: string}>({nome: 'mario', cognome: 'rossi'});
  actualAdmin = this.adminSubject.asObservable();
  
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loadingState = this.loadingSubject.asObservable();

  constructor(private httpService: HttpClient) { }

  changeAdmin(admin: {nome: string, cognome: string}): void{
    this.adminSubject.next(admin)
  }

  changeLoadingState(state: boolean): void{
    this.loadingSubject.next(state)
  }

  //get request

  getAllUser(): Observable<User[]>{
    return this.httpService.get<User[]>(`${apiUrl}/admin/listSortedCustomer`)
  }

  getNewRegistration(): Observable<BankAccount[]>{
    return this.httpService.get<BankAccount[]>(`${apiUrl}/admin/listInactiveAccounts`)
  }

  getPendingAccount(): Observable<BankAccount[]>{
    return this.httpService.get<BankAccount[]>(`${apiUrl}/admin/listClosingAccounts`)
  }


  //put request

  confirmRegistration(accountSelected: BankAccount): Observable<BankAccount>{
    return this.httpService.put<BankAccount>(`${apiUrl}/admin/activeAccount/${accountSelected.id}`, {})
  }

  //delete request

  confirmDeleteAccount(accountSelected: BankAccount): Observable<BankAccount>{
    return this.httpService.delete<BankAccount>(`${apiUrl}/admin/close/${accountSelected.id}`, {})
  }

}
