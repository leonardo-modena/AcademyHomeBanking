import { Component, HostListener, OnInit } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('triggerSidenav', [
      state('open', style({
        transform: 'translateX(0rem)',
        boxShadow: '-3px 0px 7px 1px #00000069',

      })),
      state('closed', style({
        transform: 'translateX(30rem)',
        boxShadow: 'none',
      })),
      transition('* <=> *', [
        animate('0.3s')
      ]),
    ]),
    trigger('fadeIn', [
      transition('void => *', [
        style({opacity: 0}),
        animate(300, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(200, style({opacity: 0}))
      ])
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  sidenav: boolean = false;

  hamburger: boolean = false;

  mobile!: boolean;

  authorized!: boolean;

  userLogged!: boolean;

  userInfo = {nome: 'Mario', cognome: 'Rossi'};

  constructor(private authService: AuthService) {
    this.hamburgerResponsive()
  }

  ngOnInit(): void {
    this.authorized =  this.authService.isAuth;
    this.userLogged =  this.authService.isUser;
  }

  sidenavSwitch(): void {
    this.sidenav = !this.sidenav;
    console.log(this.sidenav);
  }

  hamburgerClick() {
    this.hamburger = !this.hamburger
  }

  @HostListener('window:resize', ['$event'])
  hamburgerResponsive(event?: any) {
    let screenWidth = window.innerWidth;
    if (screenWidth > 992) {
      this.mobile = false;
    }else{
      this.mobile = true;
    }
  }

  logout(){
    this.authService.logout()
    location.reload();
  }
}
