import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BankAccount } from 'src/app/model/BankAccount';
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

  @Output() confirmAccountClick = new EventEmitter()
  @Output() confirmDeleteClick = new EventEmitter()


  constructor(private adminService: AdminService ) { }

  ngOnInit(): void {
  }
  
  activateClick(): void{
      this.adminService.confirmRegistration(this.account).subscribe( (res) => {
        this.confirmAccountClick.emit();
      } )
  
    }

    deleteClick(): void{
      this.adminService.confirmDeleteAccount(this.account).subscribe( (res) => {
        this.confirmDeleteClick.emit();
      } )
  
    }
}
