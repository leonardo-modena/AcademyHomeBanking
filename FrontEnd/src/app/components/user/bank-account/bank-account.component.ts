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

  inactiveSubscription!:Subscription;
  inactive:boolean = false;

  closingSubscription!: Subscription;
  closing: boolean = false;

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
    });

    this.inactiveSubscription = this.userService.inactiveUser.subscribe((inactive) => {
      this.inactive = inactive;
    });

    this.closingSubscription = this.userService.closingAccount.subscribe((closing) => {
      this.closing = closing;
    });
  }

  ngOnDestroy() {
    this.userSubscriptions.unsubscribe();
    this.bankAccountsSubscription.unsubscribe();
    this.operationsSubscription.unsubscribe();
    this.loadingOperationsSubscription.unsubscribe();
    this.inactiveSubscription.unsubscribe();
    this.closingSubscription.unsubscribe();
}

  onChangeBill() {
    this.userService.getOperationList(parseInt(this.bankAccounts[this.selectedBill].id), {type: 'lastTen', startDate: 0, endDate: 0} )
  }

  onSearchFunction(event: string) {
    this.operationString = event;
  }
}
