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
  sidenav: boolean = false;

  hamburger: boolean = false;

  authServiceSubscription!: Subscription;

  mobile!: boolean;

  authorized!: boolean;

  adminLogged!: boolean;

  userInfo = { nome: 'Mario', cognome: 'Rossi' };

  constructor(private authService: AuthService) {
    this.hamburgerResponsive();
  }

  ngOnInit(): void {
    this.authServiceSubscription = this.authService.actualAuth.subscribe(
      (state) => {
        this.authorized = state;
        console.log(state);
      }
    );

    this.authService.actualAdmin.subscribe((adminState) => {
      this.adminLogged = adminState;
    });
  }

  sidenavSwitch(): void {
    this.sidenav = !this.sidenav;
    console.log(this.sidenav);
  }

  hamburgerClick() {
    this.hamburger = !this.hamburger;
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

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authServiceSubscription.unsubscribe();
  }
}
