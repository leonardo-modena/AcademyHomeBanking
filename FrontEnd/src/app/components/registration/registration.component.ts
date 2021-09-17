import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import { Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import { Title } from '@angular/platform-browser';
import { fadeAnimation } from 'src/app/animation/animations';
import {ErrorService} from "../../services/error.service";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [
   fadeAnimation
  ]
})
export class RegistrationComponent implements OnInit {

  touch: boolean = false;
  numberNameError: boolean = false;
  numberCognomeError: boolean = false;
  passwordError: boolean = true;
  today!:string;
  showText: boolean = true;
  showForm: boolean = false;
  spinner: boolean = false;

  constructor(private auth: AuthService, private router: Router, private alert: AlertService, private titleService: Title, private error: ErrorService) {}

  ngOnInit(): void {
    this.titleService.setTitle(`AcademyBank | Apertura-Conto`)

    this.today = new Date().toLocaleDateString();
  }
    setTouch(){
    this.touch = true;
    }

  onSubmit(form: NgForm){
    this.touch = false;
    let nameContainNumber = /\d/.test(form.value.username);
    let cognomeContainNumber = /\d/.test(form.value.cognome);

    if (nameContainNumber){
      this.numberNameError = true;
      return;
    }
      const username = form.value.username;
      this.numberNameError = false;


    if (cognomeContainNumber){
      this.numberCognomeError = true;
      return;
    }
    const lastName = form.value.cognome;
    this.numberCognomeError = false;

    const email = form.value.email;
    const password = form.value.password;
    const confermaPassword = form.value.confermaPassword;

    if(password != confermaPassword ){
      this.passwordError = false;
      return;
    }
    this.passwordError = true;

    let date = form.value.date;
    let msDate = Date.parse(date);

    const sex = form.value.sesso;

    this.spinner = true;

    this.auth.registerUser(username, lastName, email, password, msDate,sex ).subscribe(resData => {

      if (resData == false){
        this.spinner = false;
        this.error.newError('Esiste già un utente registrato con questa email')
        return;
      }

      this.spinner = false;
      this.router.navigate(['/login']);
      this.alert.newAllert('Registrazione effettuata con successo!')
    },error => (this.spinner = false));

  }

  showLoader(){
    this.showText = false;
    this.showForm = true;
  }

}
