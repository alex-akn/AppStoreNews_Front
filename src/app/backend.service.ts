import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import App from './models/app';

@Injectable()
export class BackendService {

  private thatUrl = 'http://appstor.news/getApps.php';
  private headers: any;

  constructor(private http: HttpClient) { }

  private mapResults(resp: HttpResponse<any>){
    const msg = resp.body.message;
    console.log(msg);
    if (msg != 'OK') {
      throw new Error(msg);
    }
    const keys = resp.headers.keys();
    this.headers = keys.map(key =>
    `${key}: ${resp.headers.get(key)}`);
      
    return resp.body.results || [];
  }

  getMoreApps(params):Observable<App[]> {
    console.log(params);
    let getParams = params.reduce((acc, param) => {
      acc = acc == '' ? '?' : acc + '&';      
      return acc+param.name + '=' + param.value;
    }, '');
    console.log(getParams)
    return this.http.get(this.thatUrl+getParams, { observe: 'response' })
      .pipe(
        retry(3),
        map(this.mapResults),
        catchError(this.handleError));
  }

  searchApps(where: string, what: string): Observable<App[]> {
    what = what.trim();

    const httpar = new HttpParams().set('action', 'search').set('what', what).set('where', where);
     
    return this.http.get(this.thatUrl, { observe: 'response', params:  httpar})
      .pipe(
        map(this.mapResults),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {    
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
