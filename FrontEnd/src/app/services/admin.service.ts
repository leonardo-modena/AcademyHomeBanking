import { environment } from 'src/environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../model/user';
import { Account } from '../model/account';
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
    return this.httpService.get<User[]>(`${apiUrl}users/role`)
  }

  getNewUser(): Observable<User[]>{
    return this.httpService.get<User[]>(`${apiUrl}accounts/inactive`)
  }

  getPendingAccount(): Observable<Account[]>{
    return this.httpService.get<Account[]>(`${apiUrl}accounts/closing`)
  }


  //post request

  confirmNewUser(userSelected: User): Observable<User>{
    return this.httpService.post<User>(`${apiUrl}user/activateUser`, {
      id: userSelected.id
    })
  }

  confirmDeleteAccount(accountSelected: Account): Observable<Account>{
    return this.httpService.post<Account>(`${apiUrl}account/deleteAccount`, {
      id: accountSelected.id
    })
  }

}
