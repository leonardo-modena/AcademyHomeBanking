import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  @Input() accountList!: Account[];

  accounts:string[]=["mela","pera","banana","uva","melone","anguria","arancia","mandarino","limone","pompelmo"];
  
  constructor() { }

  ngOnInit(): void {
  }

}
