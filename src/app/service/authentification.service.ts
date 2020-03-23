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
      map(data => {
        if(data && data.token){
          //console.log('data user', data)
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserSubject.next(data);
        }
        return data;
      })
    );
  }

  public get currentUserValue(): User {
    //console.log('CurrentUserSubject', this.currentUserSubject)
    return this.currentUserSubject.value;
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
