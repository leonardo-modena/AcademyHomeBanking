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
  passwordError: boolean = false;
  today!:string;
  showText: boolean = true;
  showForm: boolean = false;
  spinner: boolean = false;
  passwordCorrect!: boolean;
  psw: string = '';
  confermaPsw: string = '';

  constructor(private auth: AuthService, private router: Router, private alert: AlertService, private titleService: Title, private error: ErrorService) {}

  ngOnInit(): void {
    this.titleService.setTitle(`AcademyBank | Apertura-Conto`)
    this.passwordCorrect = true;
    this.today = new Date().toLocaleDateString();
  }
    setTouch($event: any){
    this.touch = true;
      this.psw = $event.target.value;
    }

  checkPsw($event: any){
    this.passwordCorrect = this.psw == $event.target.value;
  }

  onSubmit(form: NgForm){
    this.touch = false;

    const username = form.value.username.trim();
    const lastName = form.value.cognome.trim();

    const email = form.value.email.trim();
    const password = form.value.password.trim();
    const confermaPassword = form.value.confermaPassword.trim();

    if(password != confermaPassword ){
      return;
    }

    let date = form.value.date;
    let msDate = Date.parse(date);

    const sex = form.value.sesso;

    this.spinner = true;

    this.auth.registerUser(username, lastName, email, password, msDate,sex ).subscribe(resData => {

      if (!resData){
        this.spinner = false;
        this.error.newError('Esiste gi?? un utente registrato con questa email')
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

  setPsw(event: any) {
    this.touch = false;
    this.psw = event.target.value;
  }

}
