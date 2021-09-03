import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { BankAccount } from 'src/app/model/BankAccount';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/services/admin.service';
import { DownloadService } from 'src/app/services/download.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, AfterContentChecked {
  adminInfo!: { nome: string; cognome: string };

  allUsers!: User[];
  allNewRagistration!: BankAccount[];
  allToDeleteAccounts!: BankAccount[];

  userSection!: boolean;
  operationSection!: boolean;

  pageLoading!: boolean;
  responsive!: boolean;

  constructor(private adminService: AdminService, private downloadService: DownloadService) {
    
    this.responsiveSection();
  }

  ngOnInit(): void { 
    this.pageLoading = true;
    this.adminService.changeLoadingState(true)
    this.adminService.getAllUser().subscribe( 
      (allUsers) => {
      this.allUsers = allUsers;
      this.adminService.changeLoadingState(false)},
      (err) => {
        this.adminService.changeLoadingState(false)}
      )
    this.adminService.getNewRegistration().subscribe( 
      (newRegistration) => {
      this.allNewRagistration = newRegistration;
      this.adminService.changeLoadingState(false)
      },
      (err) => {
        this.adminService.changeLoadingState(false)
      }
    )
    this.adminService.getPendingAccount().subscribe( 
      (toDeleteAccount) => {
      this.allToDeleteAccounts = toDeleteAccount;
      this.adminService.changeLoadingState(false)
      },
      (err) => {
        this.adminService.changeLoadingState(false)
      }
    )
    this.adminService.actualAdmin.subscribe((admin) => {
      this.adminInfo = admin;
    });
  }

  ngAfterContentChecked(): void{
    if (this.pageLoading){
      setTimeout(() => {
        this.pageLoading = false
      }, 2000);
    }    
  }

  userSectionClick(): void {
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

  confirmAccountEventCallback(): void{
    this.adminService.changeLoadingState(true)
    this.adminService.getNewRegistration().subscribe( (registrationsUpdate)  => {
      this.allNewRagistration = registrationsUpdate;
      this.adminService.changeLoadingState(false)
      },
      (err) => {
        this.adminService.changeLoadingState(false)
      }
    )
  }

  confirmDeleteEventCallback(): void{
    this.adminService.changeLoadingState(true)

    this.adminService.getPendingAccount().subscribe( (deleteAccountsUpdate) => {
      this.allToDeleteAccounts = deleteAccountsUpdate;
      this.adminService.changeLoadingState(false)
      },
      (err) => {
        this.adminService.changeLoadingState(false)
      }
    )
  }

  downloadUserExcel(): void{
    let downloadData: {firstName: string, lastName: string, email: string}[] = this.allUsers;
    this.downloadService.downloadAsXLSX(downloadData);
  }
}
