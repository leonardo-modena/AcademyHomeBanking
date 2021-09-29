import { environment } from 'src/environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../model/user';
import { BankAccount } from '../model/BankAccount';
import { AuthService } from './auth.service';

const apiUrl = environment.api_url;

@Injectable()
export class AdminService {
  //Admin Subject & Observable
  private adminSubject = new BehaviorSubject<User>({
    firstName: '',
    lastName: '',
    dateOfBirth: 0,
    email: '',
    gender: '',
    id: '',
    role: '',
    bankAccounts: []
  });
  actualAdmin = this.adminSubject.asObservable();

  //Data Subject & Observable
  private allUsersSubject = new BehaviorSubject<User[]>([]);
  allUsers = this.allUsersSubject.asObservable();
  private allNewRegistrationSubject = new BehaviorSubject<any[]>([]);
  allNewRegistration = this.allNewRegistrationSubject.asObservable();
  private allToDeleteAccountsSubject = new BehaviorSubject<BankAccount[]>([]);
  allToDeleteAccounts = this.allToDeleteAccountsSubject.asObservable();

  //Loading Subject & Observable
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loadingState = this.loadingSubject.asObservable();

  //constructor
  constructor(
    private httpService: HttpClient,
    private authService: AuthService
  ) {}

  //method Get and Change user
  getUser(id: number): Observable<User> {
    return this.httpService.get<User>(`${apiUrl}/account-management-service/customer/profile/${id}`);
  }

  changeUser(newUser: User): void {
    this.adminSubject.next(newUser);
  }

  //Data getter

  loadingCounter!: number;

  getAllData(): void {
    this.loadingCounter = 0;
    this.changeLoadingState(true);
    setTimeout(() => {
      this.getAllUser().subscribe(
        (users) => {
          this.nextAllUser(users);
          this.checkLoading();
        },
        (err) => {
          this.checkLoading();
        }
      );
      this.getNewRegistration().subscribe(
        (registrations) => {
          this.nextNewRegistration(registrations);
          this.checkLoading();
        },
        (err) => {
          this.checkLoading();
        }
      );
      this.getPendingAccount().subscribe(
        (pendingAccounts) => {
          this.nextNewCancellations(pendingAccounts);
          this.checkLoading();
        },
        (err) => {
          this.checkLoading();
        }
      );
      this.authService.actualId.subscribe((id) => {
        this.getUser(id).subscribe(
          (user) => {
            this.changeUser(user);
            this.checkLoading();
          },
          (err) => {
            this.checkLoading();
          }
        );
      });
    }, 2643);
  }

  //Data Changer

  nextAllUser(users: User[]): void {
    this.allUsersSubject.next(users);
  }

  nextNewRegistration(newRegistration: any[]): void {
    this.allNewRegistrationSubject.next(newRegistration);
  }

  nextNewCancellations(newCancellations: BankAccount[]): void {
    this.allToDeleteAccountsSubject.next(newCancellations);
  }

  //Loading change & check

  changeLoadingState(state: boolean): void {
    this.loadingSubject.next(state);
  }

  checkLoading(): void {
    if (this.loadingCounter === 3) {
      this.changeLoadingState(false);
    }
    this.loadingCounter = this.loadingCounter + 1;
  }

  //get request

  getAllUser(): Observable<User[]> {
    return this.httpService.get<User[]>(`${apiUrl}/account-management-service/admin/listSortedCustomer`);
  }

  getNewRegistration(): Observable<any[]> {
    return this.httpService.get<any[]>(
      `${apiUrl}/account-management-service/admin/listInactiveAccounts`
    );
  }

  getPendingAccount(): Observable<BankAccount[]> {
    return this.httpService.get<BankAccount[]>(
      `${apiUrl}/account-management-service/admin/listClosingAccounts`
    );
  }

  //put request

  confirmRegistration(accountSelected: BankAccount): Observable<BankAccount> {
    return this.httpService.put<BankAccount>(
      `${apiUrl}/account-management-service/admin/activeAccount/${accountSelected.id}`,
      {}
    );
  }

  //delete request

  confirmDeleteAccount(accountSelected: BankAccount): Observable<BankAccount> {
    return this.httpService.delete<BankAccount>(
      `${apiUrl}/account-management-service/admin/close/${accountSelected.id}`,
      {}
    );
  }
}
