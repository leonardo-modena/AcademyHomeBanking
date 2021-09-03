import { environment } from 'src/environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../model/user';
import { BankAccount } from '../model/BankAccount';

const apiUrl = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  //Admin Subject & Observable
  private adminSubject = new BehaviorSubject<{nome: string, cognome: string}>({nome: 'mario', cognome: 'rossi'});
  actualAdmin = this.adminSubject.asObservable();

  //Data Subject & Observable
  private allUsersSubject = new BehaviorSubject<User[]>([]);
  allUsers = this.allUsersSubject.asObservable();
  private allNewRegistrationSubject = new BehaviorSubject<BankAccount[]>([]);
  allNewRegistration = this.allNewRegistrationSubject.asObservable();
  private allToDeleteAccountsSubject = new BehaviorSubject<BankAccount[]>([]);
  allToDeleteAccounts = this.allToDeleteAccountsSubject.asObservable();  
  
  //Loading Subject & Observable
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loadingState = this.loadingSubject.asObservable();
  

  constructor(private httpService: HttpClient) { }

  changeAdmin(admin: {nome: string, cognome: string}): void{
    this.adminSubject.next(admin)
  }

  //Data getter

  loadingCounter!: number;

  getAllData(): void{
    this.loadingCounter = 0
    this.changeLoadingState(true)
    setTimeout(() => {
      this.getAllUser().subscribe( 
        (users) => {
        this.nextAllUser(users);
        this.checkLoading()
        },
        (err) => {
          this.checkLoading()
        } 
      );
      this.getNewRegistration().subscribe( 
        (registrations) => {
        this.nextNewRegistration(registrations)
        this.checkLoading()
        },
        (err) => {
          this.checkLoading()
        }
      );
      this.getPendingAccount().subscribe( 
        (pendingAccounts) => {
        this.nextNewCancellations(pendingAccounts)
        this.checkLoading()
        },
        (err) => {
          this.checkLoading()
        }
      )
    }, 2643);
  }

  //Data Changer

  nextAllUser(users: User[]): void{
    this.allUsersSubject.next(users)
  };

  nextNewRegistration(newRegistration: BankAccount[]): void{
    this.allNewRegistrationSubject.next(newRegistration)
  };

  nextNewCancellations(newCancellations: BankAccount[]): void{
    this.allToDeleteAccountsSubject.next(newCancellations)
  };

  //Loading change & check

  changeLoadingState(state: boolean): void{
    this.loadingSubject.next(state)
  }

  checkLoading(): void{
    if (this.loadingCounter === 2) {
      this.changeLoadingState(false)
    }
    this.loadingCounter = this.loadingCounter + 1;
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
