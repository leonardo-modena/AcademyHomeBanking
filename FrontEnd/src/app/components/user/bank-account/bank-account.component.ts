import {Component, OnInit} from '@angular/core';
import {Operation} from "../../../model/operation";
import {UserService} from "../../../services/user.service";
import {User} from "../../../model/user";
import {BankAccount} from "../../../model/BankAccount";

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {


  user!: User;
  bankAccounts!: BankAccount[];
  balance: number = 0;
  operations!: Operation[];

  operationString = 'Stai visualizzando le ultime 10 operazioni.'


  isLoadingOperations: boolean = false;
  isLoadingBalance = false;

  selectedBill: number = 0;

  constructor(private userService: UserService) { }

  private onGetBalance() {
    this.isLoadingBalance = false;
    this.userService.getBalance(this.selectedBill).subscribe((balance) => {
      this.balance = balance;
    }, () => { this.isLoadingBalance = false;});
  }

  ngOnInit(): void {

    this.userService.user.subscribe((user) => {
      this.user = user;
    });
    this.userService.bankAccounts.subscribe((bankAccounts) => {
      this.bankAccounts = bankAccounts;
    });
    this.isLoadingOperations = true;
    this.userService.operations.subscribe((operations) => {
      this.operations = operations;
    });

    this.userService.operationsSpinner.subscribe((loading) => {
      this.isLoadingOperations = loading;
    })

  }

  onSearchFunction(event: string) {
    this.operationString = event;
  }
}
