import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {AlertService} from "../services/alert.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private route: Router,private auth: AuthService,private alert: AlertService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(sessionStorage.getItem('token') && this.auth.isUser){
      return true;
    }
    this.alert.newAllert("Effettua il login, prima di accedere all'area Utente!")
    return this.route.navigate(['/login']);
  }

}
