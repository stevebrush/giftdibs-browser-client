import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';

import { SessionService } from './session.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: Http,
    private sessionService: SessionService) { }

  public login(emailAddress: string, password: string): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/login';
    return this.http
      .post(url, { emailAddress, password })
      .map((response: Response) => {
        const json = response.json();
        if (json && json.token) {
          this.sessionService.token = json.token;
          this.sessionService.user = json.user;
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

  public logout() {
    this.sessionService.clearAll();
  }

  public forgotten(emailAddress: string): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/forgotten';
    return this.http
      .post(url, { emailAddress })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public resetPassword(formData: any): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/reset-password';
    const token = this.sessionService.token;
    const options = new RequestOptions();

    if (token) {
      const headers = new Headers({ 'Authorization': `JWT ${token}` });
      options.headers = headers;
    }

    return this.http
      .post(url, formData, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(err: Response): ErrorObservable {
    const details = err.json();
    return Observable.throw(details);
  }
}
