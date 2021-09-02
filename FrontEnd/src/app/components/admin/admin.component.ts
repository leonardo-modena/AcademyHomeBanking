import { Component, HostListener, OnInit } from '@angular/core';
import { BankAccount } from 'src/app/model/account';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  adminInfo!: { nome: string; cognome: string };

  allUsers!: User[];
  allNewRagistration!: BankAccount[];
  allToDeleteAccounts!: BankAccount[];

  userSection!: boolean;
  operationSection!: boolean;

  responsive!: boolean;

  constructor(private adminService: AdminService) {
    // this.adminService.getAllUser().subscribe( (allUsers) => {
    //   this.allUsers = allUsers;
    // })
    this.adminService.getNewRegistration().subscribe( (newRegistration) => {
      this.allNewRagistration = newRegistration;
      console.log(this.allNewRagistration)
    })
    this.adminService.getPendingAccount().subscribe( (toDeleteAccount) => {
      this.allToDeleteAccounts = toDeleteAccount;
    })
    this.responsiveSection();
  }

  ngOnInit(): void {
    this.adminService.actualAdmin.subscribe((admin) => {
      this.adminInfo = admin;
    });
  }

  userSectionClick(): void {
    console.log('ciao');
    this.operationSection = false;
    this.userSection = true;
  }

  operationSectionClick(): void {
    this.userSection = false;
    this.operationSection = true;
  }

  @HostListener('window:resize', ['$event'])
  responsiveSection(event?: any) {
    let screenWidth = window.innerWidth;
    if (screenWidth > 995) {
      this.userSection = true;
      this.operationSection = true;
      this.responsive = false;
    } else {
      this.userSection = true;
      this.operationSection = false;
      this.responsive = true;
    }
  }
}
