import { Component, OnInit } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

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
  ],
})
export class NavbarComponent implements OnInit {
  sidenav: boolean;

  constructor() {
    this.sidenav = false;
  }

  ngOnInit(): void {}

  sidenavSwitch(): void {
    this.sidenav = !this.sidenav;
    console.log(this.sidenav);
  }
}
