import { Component, HostListener, OnInit } from '@angular/core';
import { BankAccount } from 'src/app/model/BankAccount';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/services/admin.service';
import { DownloadService } from 'src/app/services/download.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit{
  adminInfo!: { nome: string; cognome: string };

  allUsers!: User[];
  allNewRagistration!: BankAccount[];
  allToDeleteAccounts!: BankAccount[];

  userSection!: boolean;
  operationSection!: boolean;

  pageLoading!: boolean;
  loadingTimeout!: any;

  responsive!: boolean;

  constructor(private adminService: AdminService, private downloadService: DownloadService) {
    this.responsiveSection();
  }

  ngOnInit(): void { 
    this.pageLoading = true;
    this.adminService.actualAdmin.subscribe((admin) => {
      this.adminInfo = admin;
    });
    this.adminService.getAllData();
    this.adminService.allNewRegistration.subscribe( (newRegistratios) => {
      this.allNewRagistration = newRegistratios;
    });
    this.adminService.allUsers.subscribe( (users) => {
      this.allUsers = users
    } );
    this.adminService.allToDeleteAccounts.subscribe( (toDelete) => {
        this.allToDeleteAccounts = toDelete
    });
    this.adminService.loadingState.subscribe( (state) => {
      this.pageLoading = state
    })
  }

  userSectionClick(): void {
    this.operationSection = false;
    this.userSection = true;
  }

  operationSectionClick(): void {
    this.userSection = false;
    this.operationSection = true;
  }

  
  confirmAccountEventCallback(): void{
    this.adminService.getAllData()
    
  }
  
  confirmDeleteEventCallback(): void{
    this.adminService.getAllData()
  }

  downloadUserExcel(): void{
    let downloadData: {firstName: string, lastName: string, email: string}[] = this.allUsers;
    this.downloadService.downloadAsXLSX(downloadData);
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
