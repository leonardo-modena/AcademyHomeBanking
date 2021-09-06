import {Component, OnInit} from '@angular/core';
import {Operation} from "../../../model/operation";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {User} from "../../../model/user";

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {


  user!: User;
  balance: number = 0;
  operations: Operation[] = [
    {
      type: 'prelievo',
      importo: 234.54,
      dataPrelievo: 1628763225000,
      causale: 'Spese mediche',
      beneficiario: 'Ospedale di Piombino',
      mittente: ''
    },
    {
      type: 'versamento',
      importo: 403.46,
      dataPrelievo: 1622277132000,
      causale: 'Vendita mobile',
      beneficiario: '',
      mittente: 'Tizio Caio'
    }
  ];

  isLoadingOperations: boolean = false;
  isLoadingBalance = false;

  selectedBill!: number;
  bills = [1, 2];

  selectBillForm!: FormGroup;

  constructor(private userService: UserService) { }

  private onGetBalance() {
    this.isLoadingBalance = true;
    this.userService.getBalance(this.selectedBill).subscribe((balance) => {
      this.balance = balance;

    }, (errorMessage) => { this.isLoadingBalance = false;});

  }

  ngOnInit(): void {
    this.userService.user.subscribe((user) => {
      this.user = user;
      this.bills = user.bankAccounts;
    });

    this.selectedBill = this.bills[0];
    this.selectBillForm = new FormGroup({
      'selectedBill': new FormControl(this.selectedBill)
    });
    this.onGetBalance();

    this.userService.getBalance(1);
    this.userService.getOperationList().subscribe((resData) => {
      console.log(resData);
    });
  }

  onChangeBill(): void {
    this.onGetBalance();
    this.userService.getBillInformation(this.selectedBill);
    //this.onGetOperations();
  }

  onGetOperations(): void {
    /*this.isLoadingOperations = true;
    this.userService.getOperationList(this.selectedBill, {type: 'last10'}).subscribe((operations) => {
      this.operations = operations;
      this.isLoadingOperations = false;
    }, (errorMessage) => {this.isLoadingOperations = false});*/
  }

  onSearchFunction(filterValues: {type: 'dateSelection', startDate?: number, endDate?: number}): void {
    /*this.isLoadingOperations = true;

    this.userService.getOperationList(this.selectedBill, filterValues).subscribe((operations) => {
      this.operations = operations;
      this.isLoadingOperations = false;
    }, (errorMessage) => {this.isLoadingOperations = false});*/

  }
}
