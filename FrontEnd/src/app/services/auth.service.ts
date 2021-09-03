import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import { environment } from "../../environments/environment";
import {BehaviorSubject} from "rxjs";
import jwtDecode from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private id = new BehaviorSubject(0);
  actualId = this.id.asObservable();

  private isAuth = new BehaviorSubject(false);
  actualAuth = this.isAuth.asObservable();

  private isAdmin = new BehaviorSubject(false);
  actualAdmin = this.isAdmin.asObservable();

  url: string = environment.api_url;
  isUser: boolean = false;
  token !: string;
  tokenExpiration !: number;
  roleUser !: string;
  tokenDecoded!: any;

  constructor(private http: HttpClient,private route: Router) {
    if (sessionStorage.getItem('token')){
      this.nextAuth(true);
    }
  }

  registerUser(firstName: string, lastName: string, email: string, password: string,dateOfBirth: number,gender: string){

    return this.http.post(this.url + "/registrazione",{
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      gender,
    })
  }

  loginUser(username: string, password: string){

    this.http.post<any>( this.url + '/auth/signin',{
      username,
      password
    }).subscribe(resData => {

      this.tokenDecoded = jwtDecode(resData.token);

      this.token = resData.token;
      sessionStorage.setItem('token', resData.token);

      this.tokenExpiration = this.tokenDecoded.expiration;
      this.roleUser = this.tokenDecoded.role;

      this.passId(this.tokenDecoded.id);

      this.nextAuth(true)
      if (this.roleUser === "ROLE_C"){
        this.route.navigate(['/user'])
        this.isUser = true;
      }
      if( this.roleUser === "ROLE_D"){
        this.route.navigate(['/admin'])
        this.nextAdmin(true);
      }

    })
  }

  logout(){
    this.nextAuth(false);
    this.nextAdmin(false);
    this.isUser = false;
    sessionStorage.removeItem('token');
    this.route.navigate(['']);
  }

  autoLogout(){
    setTimeout(this.logout,this.tokenExpiration);
  }

  passId(id: number){
    this.id.next(id)
  }

  nextAuth(state: boolean){
    this.isAuth.next(state)
  }

  nextAdmin(state: boolean){
    this.isAdmin.next(state)
  }

}
