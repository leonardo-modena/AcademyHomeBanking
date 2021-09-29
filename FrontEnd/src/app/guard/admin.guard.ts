import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {AlertService} from "../services/alert.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private route: Router, private auth: AuthService, private alert: AlertService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isAdmin;
    this.auth.actualAdmin.subscribe(state => { isAdmin = state})

    if(sessionStorage.getItem('token') && isAdmin ){
      return true;
    }

    this.alert.newAllert("Effettua il login per accedere!")
    return this.route.navigate(['/login']);
  }

}
