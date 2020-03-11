import { AuthentificationService } from './../service/authentification.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authentificationservice: AuthentificationService
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const currentUser = this.authentificationservice.currentUserValue;
    if(currentUser){
      return true;
    }

    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

}
