import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  today!:string;

  constructor() {}

  ngOnInit(): void {
    this.today = new Date().toLocaleDateString();

  }

  onSubmit(form: NgForm){

  console.log(form.value);

  }

}
