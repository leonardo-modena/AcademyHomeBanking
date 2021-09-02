import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import { Router} from "@angular/router";
import {Operation} from "../../model/operation";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
}
