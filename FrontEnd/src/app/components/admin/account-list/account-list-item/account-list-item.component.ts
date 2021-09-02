import { Component, Input, OnInit } from '@angular/core';
import { BankAccount } from 'src/app/model/account';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-account-list-item',
  templateUrl: './account-list-item.component.html',
  styleUrls: ['./account-list-item.component.css']
})
export class AccountListItemComponent implements OnInit {

  @Input() pendingRegistration!:boolean;

  @Input() account!: BankAccount;
  @Input() index!: number;
  constructor(private adminService: AdminService ) { }

  ngOnInit(): void {
  }
  
  activateClick(): void{
      this.adminService.confirmRegistration(this.account);
  
    }

    deleteClick(): void{
      this.adminService.confirmDeleteAccount(this.account);
  
    }
}
