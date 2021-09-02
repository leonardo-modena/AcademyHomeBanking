import { Component, OnInit } from '@angular/core';
import {Operation} from "../../../model/operation";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  user!: { nome: string, cognome: string, dataDiNascita: number, email: string, id: string };
  balance: number = 0;
  routeUrl: string = '';
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
  bills = [1111, 2222];

  selectBillForm!: FormGroup;


  constructor(private userService: UserService,) {
  }

  ngOnInit(): void {

    this.userService.user.subscribe((user: { nome: string, cognome: string, dataDiNascita: number, email: string, id: string }) => {
      this.user = user;
    });

    this.selectedBill = this.bills[0];
    this.selectBillForm = new FormGroup({
      'selectedBill': new FormControl(this.selectedBill)
    })

    this.balance = this.userService.getBalance();
  }

  onChangeBill(): void {
    // this.isLoadingBalance = true;

    this.userService.getBalance(); // this.balance = balance - loading-spinner balance
    this.onGetOperations();
    console.log(this.selectedBill);
  }

  onGetOperations(): void {
    this.userService.getOperationList({type: 'last10'}); // this.operations = operations - loading-spinner operations
  }

  onSearchFunction(b: boolean): void {
    this.isLoadingOperations = b;
  }
}
