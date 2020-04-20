import { map, retry, catchError } from 'rxjs/operators';
import { Compte } from './../models/compte';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComptesService {

  constructor(
    private http: HttpClient
  ) { }

  getPartenaires(): Observable<any>{
    return this.http.get<any>(environment.apiUrl + '/api/partenaires').pipe(
      map( data => data['hydra:member']),
      retry(1),
      catchError(this.handleError)
    );
  }

  getComptes(): Observable<Compte>{
    return this.http.get<Compte>(environment.apiUrl + '/api/comptes').pipe(
      map( data => data['hydra:member']),
      retry(1),
      catchError(this.handleError)
    );
  }

  createCompte(compte: any): Observable<any>{
    return this.http.post<any>(environment.apiUrl + '/api/creation_compte', compte).pipe(
      map(data => data),
      retry(1),
      catchError(this.handleError)
    );
  }

  deletePartenaire(id: number): Observable<any>{
    return this.http.delete<any>(environment.apiUrl + '/api/partenaires/' + id).pipe(
      map(data => data),
      retry(1),
      catchError(this.handleError)
    );
  }

  updatePartenaire(partenaire: any, id: number): Observable<any>{
    return this.http.put<any>(environment.apiUrl + '/api/partenaires/' + id, partenaire).pipe(
      map(data => data),
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
