import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import { Title } from '@angular/platform-browser';
import { fadeAnimation } from 'src/app/animation/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    fadeAnimation
  ]
})
export class LoginComponent implements OnInit {


  constructor(private auth: AuthService, private route: Router, private alert: AlertService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(`AcademyBank | Login`);
  }

  onSubmit(form: NgForm): void {

    const username = form.value.email;
    const password = form.value.password;

    this.auth.loginUser(username,password);

  }


}
