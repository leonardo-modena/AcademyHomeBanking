import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: boolean = false;
  isUser: boolean = false;

  constructor() { }

}
