import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/Shared/dialog/dialog.component';
import { BankAccount } from 'src/app/model/BankAccount';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-account-list-item',
  templateUrl: './account-list-item.component.html',
  styleUrls: ['./account-list-item.component.css'],
})
export class AccountListItemComponent implements OnInit {
  @Input() pendingRegistration!: boolean;

  @Input() account!: BankAccount;

  @Output() confirmAccountClick = new EventEmitter();
  @Output() confirmDeleteClick = new EventEmitter();

  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  activateClick(): void {
    this.dialog
      .open(DialogComponent, {
        closeOnNavigation: true,
        data: { message: `Confermare la convalida dell' account n.${this.account.id}` },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.adminService
            .confirmRegistration(this.account)
            .subscribe((res) => {
              this.confirmAccountClick.emit();
            });
        }
      });
  }

  deleteClick(): void {
    this.dialog
      .open(DialogComponent, {
        closeOnNavigation: true,
        data: { message: `Confermare la chiusura dell' account n.${this.account.id}` },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.adminService
            .confirmDeleteAccount(this.account)
            .subscribe((res) => {
              this.confirmDeleteClick.emit();
            });
        }
      });
  }
}
