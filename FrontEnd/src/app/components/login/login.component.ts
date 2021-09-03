import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";

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

    const username = form.value.email;
    const password = form.value.password;
    console.log(username, password);
    this.auth.loginUser(username,password).subscribe(resData => {
      console.log(resData)
      const token = resData.token;
      this.auth.tokenExpiration = resData.tokenExpiration;
      this.auth.token = token;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('role', resData.role);

      this.auth.isAuth = true;
      if (resData.role === "ROLE_C"){
        this.route.navigate(['/user'])
        this.auth.isUser = true;
      }
      if(resData.role === "ROLE_D"){
        this.route.navigate(['/admin'])
        this.auth.isAdmin = true;
      }

    })

  }

}
