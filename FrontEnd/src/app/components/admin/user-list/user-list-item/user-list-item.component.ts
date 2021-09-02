import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {

  @Input() user!:User;
  @Input() index!:number;

  constructor() { }

  ngOnInit(): void {
  }

}
