import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';

import { SessionService } from './session.service';
import { AlertService } from './alert.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: Http,
    private router: Router,
    private alertService: AlertService,
    private sessionService: SessionService) { }

  public login(emailAddress: string, password: string): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/login';
    return this.http
      .post(url, { emailAddress, password })
      .map((response: Response) => this.handleLogin(response))
      .catch((err: any) => this.handleError(err));
  }

  public loginUsingFacebook(facebookUserAccessToken: string): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/login-facebook';
    return this.http
      .post(url, { facebookUserAccessToken })
      .map((response: Response) => this.handleLogin(response))
      .catch((err: any) => {
        const details = err.json();
        return Observable.throw(details);
      });
  }

  public register(formData: any): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/register';
    return this.http
      .post(url, formData)
      .map((response: Response) => this.handleSuccess(response))
      .catch((err: any) => this.handleError(err));
  }

  public logout() {
    this.sessionService.clearAll();
  }

  public forgotten(emailAddress: string): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/forgotten';
    return this.http
      .post(url, { emailAddress })
      .map((response: Response) => this.handleSuccess(response))
      .catch((err: any) => this.handleError(err));
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
      .map((response: Response) => this.handleSuccess(response))
      .catch((err: any) => this.handleError(err));
  }

  public resendEmailAddressVerification(id: string): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/resend-email-verification';
    const token = this.sessionService.token;
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .post(url, { id }, options)
      .map((response: Response) => this.handleSuccess(response))
      .catch((err: any) => this.handleError(err));
  }

  public verifyEmailAddress(emailAddressVerificationToken: string): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/verify-email';
    const token = this.sessionService.token;
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .post(url, { emailAddressVerificationToken }, options)
      .map((response: Response) => this.handleSuccess(response))
      .catch((err: any) => this.handleError(err));
  }

  private handleError(err: Response): ErrorObservable {
    if (err.status === 401) {
      const routerOptions = {
        queryParams: {
          redirectUrl: this.router.url
        }
      };
      this.alertService.error('You must be logged in to view that page.', true);
      this.router.navigate(['/login'], routerOptions);
    }

    const details = err.json();
    return Observable.throw(details);
  }

  private handleSuccess(response: Response): any {
    const json = response.json();

    if (json.authResponse) {
      this.sessionService.setUser(json.authResponse.user);
      this.sessionService.token = json.authResponse.token;
    }

    return json;
  }

  private handleLogin(response: Response): any {
    const json = response.json();

    if (json && json.authResponse && json.authResponse.token) {
      this.sessionService.token = json.authResponse.token;
      this.sessionService.setUser(json.authResponse.user);
    }

    return response.json();
  }
}
