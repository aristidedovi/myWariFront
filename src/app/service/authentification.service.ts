import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  login(user: User){
    return this.http.post<User>(environment.apiUrl+'/login_check', user).pipe(
      map(user => {
        if(user && user.token){
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
