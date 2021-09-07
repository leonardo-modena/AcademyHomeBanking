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

  isLoadingOperations: boolean = true;
  isLoadingBalance = false;

  selectedBill: number = 0;

  constructor(private userService: UserService) { }

  private onGetBalance() {
    this.isLoadingBalance = false;
    this.userService.getBalance(this.selectedBill).subscribe((balance) => {
      this.balance = balance;
    }, (errorMessage) => { this.isLoadingBalance = false;});
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
      console.log(this.isLoadingOperations);
      setTimeout(() => {
        console.log(this.isLoadingOperations);
        this.isLoadingOperations = false;
        }, 5000)
      //this.isLoadingOperations = false;
      this.operations = operations;
    });
  }

  onSearchFunction(filterValues: {type: 'lastTen' | 'lastThreeMonths' | 'betweenTwoDates', startDate: number, endDate: number}): void {
    this.isLoadingOperations = true;
    console.log(this.isLoadingOperations);
    this.userService.getOperationList(this.selectedBill, filterValues);
  }
}
