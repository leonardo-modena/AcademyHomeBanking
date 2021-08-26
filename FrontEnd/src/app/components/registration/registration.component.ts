import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  touch: boolean = false;
  numberNameError: boolean = false;
  numberCognomeError: boolean = false;
  today!:string;

  constructor() {}

  ngOnInit(): void {
    this.today = new Date().toLocaleDateString();

  }
    setTouch(){
    this.touch = true;
    }
  onSubmit(form: NgForm){

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
    const cognome = form.value.cognome;
    this.numberCognomeError = false;

  const email = form.value.email;
  let date = form.value.date;
  const password = form.value.password;
  let ms = Date.parse(date);


  }

}
