import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  accounts:string[]=["mela","pera","banana","uva","melone","anguria","arancia","mandarino","limone","pompelmo"];
  
  constructor() { }

  ngOnInit(): void {
  }

}
