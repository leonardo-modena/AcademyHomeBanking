import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() userList!: User[];


  users:string[]=["mela","pera","banana","uva","melone","anguria","arancia","mandarino","limone","pompelmo"];

  constructor() { }

  ngOnInit(): void {
  }

}
