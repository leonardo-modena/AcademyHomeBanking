import {Component, OnInit} from '@angular/core';
import {Operation} from "../../../model/operation";
import {UserService} from "../../../services/user.service";
import {User} from "../../../model/user";
import {BankAccount} from "../../../model/BankAccount";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {


  user!: User;
  userSubscriptions!: Subscription;

  bankAccounts!: BankAccount[];
  bankAccountsSubscription!: Subscription;

  operations!: Operation[];
  operationsSubscription!: Subscription;

  balance: number = 0;


  operationString = 'Stai visualizzando le ultime 10 operazioni.'

  isLoadingOperations: boolean = false;
  loadingOperationsSubscription!: Subscription;

  selectedBill: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userSubscriptions = this.userService.user.subscribe((user) => {
      this.user = user;
    });

    this.bankAccountsSubscription = this.userService.bankAccounts.subscribe((bankAccounts) => {
      this.bankAccounts = bankAccounts;
    });

    this.isLoadingOperations = true;
    this.operationsSubscription = this.userService.operations.subscribe((operations) => {
      this.operations = operations;
    });

    this.loadingOperationsSubscription = this.userService.operationsSpinner.subscribe((loading) => {
      this.isLoadingOperations = loading;
    })

  }

  ngOnDestroy() {
    this.userSubscriptions.unsubscribe();
    this.bankAccountsSubscription.unsubscribe();
    this.operationsSubscription.unsubscribe();
    this.loadingOperationsSubscription.unsubscribe();
}

  onSearchFunction(event: string) {
    this.operationString = event;
  }
}
