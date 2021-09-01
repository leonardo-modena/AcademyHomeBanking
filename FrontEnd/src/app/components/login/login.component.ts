import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

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

  constructor(private auth: AuthService, private route: Router) { }

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
