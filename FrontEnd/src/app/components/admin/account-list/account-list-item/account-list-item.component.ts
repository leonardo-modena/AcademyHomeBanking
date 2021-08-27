import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-list-item',
  templateUrl: './account-list-item.component.html',
  styleUrls: ['./account-list-item.component.css']
})
export class AccountListItemComponent implements OnInit {

  @Input() account!: string;
  @Input() index!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
