import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import { fadeAnimation, sidenavSlide } from 'src/app/animation/animations';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    sidenavSlide,
    fadeAnimation
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {
  hamburger: boolean = false;
  
  sidenav: boolean = false;

  operationMenu: boolean = false;

  authServiceSubscription!: Subscription;

  mobile!: boolean;

  authorized!: boolean;

  adminLogged!: boolean;
  constructor(private authService: AuthService) {
    this.hamburgerResponsive();
  }

  ngOnInit(): void {
    this.authServiceSubscription = this.authService.actualAuth.subscribe(
      (state) => {
        this.authorized = state;
      }
    );

    this.authService.actualAdmin.subscribe((adminState) => {
      this.adminLogged = adminState;
    });
  }

  sidenavSwitch(): void {
    this.sidenav = !this.sidenav;
    this.sidenav === false ? this.operationMenu = false : false
  }

  operationMenuSwitch(): void {
    this.operationMenu = !this.operationMenu;
  }


  hamburgerClick() {
    this.hamburger = !this.hamburger;
  }

  logout() {
    this.authService.logout();
  }
  
  @HostListener('window:resize', ['$event'])
  hamburgerResponsive(event?: any) {
    let screenWidth = window.innerWidth;
    if (screenWidth > 992) {
      this.mobile = false;
    } else {
      this.mobile = true;
    }
  }

  ngOnDestroy() {
    this.authServiceSubscription.unsubscribe();
  }
}
