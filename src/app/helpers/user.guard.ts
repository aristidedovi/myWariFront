import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { AuthentificationService } from '../service/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private authentificationservice: AuthentificationService,
    private router: Router,
  ){

  }
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const userTokenDecode = jwt_decode(this.authentificationservice.currentUserValue.token);

    if(userTokenDecode.roles.includes('ROLE_CAISSIER_SYSTEME')){
      console.warn('users token s', userTokenDecode.roles);
      this.router.navigate(['/home'], {queryParams: {returnUrl: state.url}});
      return false;
    }

    return true;


  }

}
