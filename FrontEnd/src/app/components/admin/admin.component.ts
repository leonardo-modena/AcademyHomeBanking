import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { BankAccount } from 'src/app/model/BankAccount';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { DownloadService } from 'src/app/services/download.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  adminSubscription: Subscription[] = [];

  adminInfo!: User;
  allUsers!: User[];
  allNewRagistration!: BankAccount[];
  allToDeleteAccounts!: BankAccount[];

  userSection!: boolean;
  operationSection!: boolean;

  pageLoading!: boolean;
  loadingTimeout!: any;

  responsive!: boolean;

  constructor(
    private adminService: AdminService,
    private titleService: Title,
    private authService: AuthService
  ) {
    this.responsiveSection();
  }

  ngOnInit(): void {
    this.pageLoading = true;

    this.adminService.actualAdmin.subscribe((admin) => {
      this.adminInfo = admin;
      //set Title
      console.log(admin);
      this.titleService.setTitle(
        `${this.adminInfo.firstName.toLocaleUpperCase()} | Admin-Dashboard`
      );
    })


    this.adminService.getAllData();
    this.adminSubscription.push(
      this.adminService.allNewRegistration.subscribe((newRegistratios) => {
        this.allNewRagistration = newRegistratios;
      })
    );
    this.adminSubscription.push(
      this.adminService.allUsers.subscribe((users) => {
        this.allUsers = users;
      })
    );
    this.adminSubscription.push(
      this.adminService.allToDeleteAccounts.subscribe((toDelete) => {
        this.allToDeleteAccounts = toDelete;
      })
    );
    this.adminSubscription.push(
      this.adminService.loadingState.subscribe((state) => {
        this.pageLoading = state;
      })
    );
  }

  userSectionClick(): void {
    this.operationSection = false;
    this.userSection = true;
  }

  operationSectionClick(): void {
    this.userSection = false;
    this.operationSection = true;
  }

  confirmAccountEventCallback(): void {
    this.adminService.getAllData();
  }

  confirmDeleteEventCallback(): void {
    this.adminService.getAllData();
  }

  @HostListener('window:resize', ['$event'])
  responsiveSection(event?: any): void {
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

  ngOnDestroy(): void {
    if (this.adminSubscription.length > 0) {
      this.adminSubscription.forEach((subscription) =>
        subscription.unsubscribe()
      );
    }
  }
}
