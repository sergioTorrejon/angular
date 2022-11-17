import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class CrudService {
    private url: string = '';

    constructor (private http: HttpClient) {
        this.url = environment.api;
    }

    getDepartementos(): Observable<any> {
      return this.http.get<any>(
        `${this.url}/departamento`
        )
      .pipe(
        catchError(this.handleError('getDepartemento', []))
      );
    }

    getModalidades(): Observable<any> {
      return this.http.get<any>(
        `${this.url}/modalidad`
        )
      .pipe(
        catchError(this.handleError('getModalidad', []))
      );
    }

    getParametro(parametro: string): Observable<any> {
      return this.http.get<any>(
        `${this.url}/parametros/${parametro}`
        )
      .pipe(
        catchError(this.handleError('getParametro', []))
      );
    }

      /**
   * Función para manejar los errores en las llamadas a los APIs. En desarrollo
   *
   * @param operation
   * @param result
   */
       private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead

          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);

          // Let the app keep running by returning an empty result.
          return of(result as T);
        }
      }

}
