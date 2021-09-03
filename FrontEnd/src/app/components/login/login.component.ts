import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import jwtDecode from "jwt-decode";


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

  tokenDecoded!: any;

  constructor(private auth: AuthService, private route: Router, private alert: AlertService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm){

    const username = form.value.email;
    const password = form.value.password;

    this.auth.loginUser(username,password).subscribe(resData => {

      this.tokenDecoded = jwtDecode(resData.token);

      this.auth.token = resData.token;
      sessionStorage.setItem('token', resData.token);

      this.auth.tokenExpiration = this.tokenDecoded.expiration;
      this.auth.roleUser = this.tokenDecoded.role;

      this.auth.passId(this.tokenDecoded.id);

      if (this.auth.roleUser === "ROLE_C"){
        this.route.navigate(['/user'])
        this.auth.isAuth = true;
        this.auth.isUser = true;
      }
      if( this.auth.roleUser === "ROLE_D"){
        this.route.navigate(['/admin'])
        this.auth.isAuth = true;
        this.auth.isAdmin = true;
      }

    })

  }


}
