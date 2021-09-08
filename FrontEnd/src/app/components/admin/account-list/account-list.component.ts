import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BankAccount } from 'src/app/model/BankAccount';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
})
export class AccountListComponent implements OnInit {
  @Input() newRegistrationMode: boolean = false;
  @Input() accountList!: BankAccount[];

  @Output() confirmAcountEvent = new EventEmitter();
  @Output() confirmDeleteEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  passConfirmAccountEvent(): void {
    this.confirmAcountEvent.emit();
  }

  passConfirmDeleteEvent(): void {
    this.confirmDeleteEvent.emit();
  }
}
