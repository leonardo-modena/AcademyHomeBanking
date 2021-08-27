import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({opacity: 0}),
        animate(500, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(1500, style({opacity: 0}))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  numberNameError: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    let nameContainNumber = /\d/.test(form.value.username);

    if (nameContainNumber){
      this.numberNameError = true;
      return;
    }

    const username = form.value.username;
    this.numberNameError = false;
  }
}
