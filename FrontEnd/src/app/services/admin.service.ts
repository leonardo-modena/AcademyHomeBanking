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
  
  constructor(private httpService: HttpClient) { }

  changeAdmin(admin: {nome: string, cognome: string}): void{
    this.adminSubject.next(admin)
  }

  //get request

  getAllUser(): Observable<User[]>{
    return this.httpService.get<User[]>(`${apiUrl}/users/role`)
  }

  getNewRegistration(): Observable<BankAccount[]>{
    return this.httpService.get<BankAccount[]>(`${apiUrl}/admin/listInactiveAccounts`)
  }

  getPendingAccount(): Observable<BankAccount[]>{
    return this.httpService.get<BankAccount[]>(`${apiUrl}/accounts/closing`)
  }


  //post request

  confirmRegistration(accountSelected: BankAccount): void{
    this.httpService.post<BankAccount>(`${apiUrl}/admin/activeAccount/${accountSelected.id}`, {}).subscribe( (res) => {
      console.log(res)
    } )
  }

  confirmDeleteAccount(accountSelected: BankAccount): Observable<BankAccount>{
    return this.httpService.post<BankAccount>(`${apiUrl}/account/deleteAccount`, {
      id: accountSelected.id
    })
  }

}
