import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() operation!: boolean;

  @Input() toDeleteAccounts!: Account[];

  @Input() allUsers!: User[];

  @Input() newUsers!: User[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
