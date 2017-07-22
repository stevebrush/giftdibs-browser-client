import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

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
    private router: Router,
    private sessionService: SessionService) { }

  public login(emailAddress: string, password: string): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/login';
    return this.http
      .post(url, { emailAddress, password })
      .map((response: Response) => {
        const json = response.json();
        if (json && json.token) {
          this.sessionService.token = json.token;
          this.sessionService.setUser(json.user);
        }
      })
      .catch((err) => this.handleError(err));
  }

  public register(formData: any): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/register';
    return this.http
      .post(url, formData)
      .map((response: Response) => response.json())
      .catch((err) => this.handleError(err));
  }

  public logout() {
    this.sessionService.clearAll();
  }

  public forgotten(emailAddress: string): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/forgotten';
    return this.http
      .post(url, { emailAddress })
      .map((response: Response) => response.json())
      .catch((err) => this.handleError(err));
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
      .catch((err) => this.handleError(err));
  }

  public resendEmailAddressVerification(id: string): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/resend-email-verification';
    const token = this.sessionService.token;
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .post(url, { id }, options)
      .map((response: Response) => response.json())
      .catch((err) => this.handleError(err));
  }

  public verifyEmailAddress(emailAddressVerificationToken: string): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/verify-email';
    const token = this.sessionService.token;
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .post(url, { emailAddressVerificationToken }, options)
      .map((response: Response) => response.json())
      .catch((err) => this.handleError(err));
  }

  private handleError(err: Response): ErrorObservable {
    if (err.status === 401) {
      const routerOptions = {
        queryParams: {
          redirectUrl: this.router.url
        }
      };
      this.router.navigate(['/login'], routerOptions);
      return;
    }

    const details = err.json();
    return Observable.throw(details);
  }
}
