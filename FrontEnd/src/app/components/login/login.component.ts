import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {isObservable, observable} from "rxjs/internal-compatibility";
import {AlertService} from "../../services/alert.service";
import {subscriptionLogsToBeFn} from "rxjs/internal/testing/TestScheduler";

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

  constructor(private auth: AuthService, private route: Router, private alert: AlertService) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm){

    const email = form.value.email;

    const password = form.value.password;

    this.auth.loginUser(email,password).subscribe(resData => {
      console.log(resData);

    })
  }

}
