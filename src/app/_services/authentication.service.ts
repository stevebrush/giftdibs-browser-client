import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { SessionService } from './session.service';

@Injectable()
export class AuthenticationService {
  private resourceUrl = 'http://localhost:8080/v1/auth';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

  public login(emailAddress: string, password: string): Observable<any> {
    return this.http.post<any>
      (`${this.resourceUrl}/login`, { emailAddress, password });
  }

  public loginUsingFacebook(facebookUserAccessToken: string): Observable<any> {
    return this.http.post<any>
      (`${this.resourceUrl}/login-facebook`, { facebookUserAccessToken });
  }

  public logout() {
    this.sessionService.clearAll();
  }

  public register(formData: any): Observable<any> {
    return this.http.post<any>
      (`${this.resourceUrl}/register`, formData);
  }

  public forgotten(emailAddress: string): Observable<any> {
    return this.http.post<any>
      (`${this.resourceUrl}/forgotten`, { emailAddress });
  }

  public resetPassword(formData: any): Observable<any> {
    return this.http.post<any>
      (`${this.resourceUrl}/reset-password`, formData);
  }

  public resendEmailAddressVerification(id: string): Observable<any> {
    return this.http.post<any>
      (`${this.resourceUrl}/resend-email-verification`, { id });
  }

  public verifyEmailAddress(emailAddressVerificationToken: string): Observable<any> {
    return this.http.post<any>
      (`${this.resourceUrl}/verify-email`, { emailAddressVerificationToken });
  }
}
