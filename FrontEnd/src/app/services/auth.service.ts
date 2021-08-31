import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  url: string = environment.api_url;
  isAuth: boolean = false;
  isUser: boolean = false;
  isAdmin: boolean = false;
  token !: string;

  constructor(private http: HttpClient) { }

  registerUser(username: string, lastname: string, email: string, password: string,msDate: number,sex: string){

    return this.http.post(this.url + "/registrazione",{
      username,
      lastname,
      email,
      password,
      msDate,
      sex
    })
  }

  loginUser(username: string, password: string){

    return this.http.post(this.url + '/login',{
      username,
      password
    })
  }

  logout(){
    this.isAuth = false;
    sessionStorage.removeItem('token');
  }

  autoLogout(){
    setTimeout(this.logout,1000);
  }



}
