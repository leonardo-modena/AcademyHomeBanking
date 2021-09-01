import { Component, Input, OnInit } from '@angular/core';
import { BankAccount } from 'src/app/model/account';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  @Input() newRegistrationMode: boolean = false;
  @Input() accountList!: BankAccount[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
