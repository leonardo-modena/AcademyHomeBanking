import { Component, Input, OnInit } from '@angular/core';
import { BankAccount } from 'src/app/model/account';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() operation!: boolean;

  @Input() toDeleteAccounts!: BankAccount[];

  @Input() allUsers!: User[];

  @Input() newRegistration!: BankAccount[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
