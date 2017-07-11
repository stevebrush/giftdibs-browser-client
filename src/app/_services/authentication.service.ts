import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: Http) { }

  public login(emailAddress: string, password: string): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/login';
    return this.http
      .post(url, { emailAddress, password })
      .map((response: Response) => {
        const user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      })
      .catch(this.handleError);
  }

  public register(formData: any): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/register';
    return this.http
      .post(url, formData)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  private handleError(err: Response): ErrorObservable {
    const details = err.json();
    return Observable.throw(details);
  }
}
