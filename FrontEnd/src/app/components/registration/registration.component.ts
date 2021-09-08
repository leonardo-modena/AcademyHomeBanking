import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import { Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import { Title } from '@angular/platform-browser';
import { fadeAnimation } from 'src/app/animation/animations';


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
  spinner: boolean = false;
  showForm: boolean = false;

  constructor(private auth: AuthService, private router: Router, private alert: AlertService, private titleService: Title) {}

  ngOnInit(): void {
    //set Title
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
    let msDate = Date.parse(date); //SOSTITUIRE CON new Date(date) E PROVARE
    console.log(msDate)
    const sex = form.value.sesso;

    this.auth.registerUser(username, lastName, email, password, msDate,sex ).subscribe(resData => {
      console.log(resData);
      this.router.navigate(['/login']);
      this.alert.newAllert('Registrazione effettuata con successo! Procedi col login.')
    });

  }

  showLoader(){
    this.showText = false;
    this.spinner = true;
    setTimeout(()=>{this.setSpinner()},3000)
  }

  setSpinner(){
    this.spinner = false;
    this.showForm = true;
  }
}
