import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  url: string = "http://localhost:8080";
  isAuth: boolean = false;
  isUser: boolean = false;

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


}
