import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User>{
    return this.http.get<User>(environment.apiUrl + '/api/users').pipe(
      map( data => data['hydra:member']),
      retry(1),
      catchError(this.handleError)
    );
  }

  getUserByUsername(username): Observable<User>{
    return this.http.get<User>(environment.apiUrl + '/api/users/username/' + username).pipe(
      map(data => data),
      retry(1),
      catchError(this.handleError)
    );
  }

  addUser(user: User): Observable<User>{
    return this.http.post<User>(environment.apiUrl + '/api/users', user).pipe(
      map(data => data['hydra:member']),
      retry(1),
      catchError(this.handleError)
    )
  }

  findUser(id: number): Observable<User>{
    return this.http.get<User>(environment.apiUrl + '/api/users/' + id ).pipe(
    map( data => data),
      retry(1),
      catchError(this.handleError)
    )
  }

  updateUser(user: User, id: number): Observable<User>{
    console.log('user update', user);
    return this.http.put<User>(environment.apiUrl + '/api/users/' + id, user).pipe(
      map(data => data),
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteUser(id: number): Observable<User>{
    return this.http.delete<User>(environment.apiUrl + '/api/users/' + id).pipe(
      map(data => data),
      retry(1),
      catchError(this.handleError)
    )
  }

  getRoles(): Observable<Object>{
    return this.http.get<Object>(environment.apiUrl + '/api/roles').pipe(
      map(data => data['hydra:member']),
      retry(1),
      catchError(this.handleError)
    )
  }

    // Error handling
    handleError(error) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
   }
}
