import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AccountService {
  private resourceUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  public login(emailAddress: string, password: string): Observable<any> {
    return this.http.post(`${this.resourceUrl}/login`, {
      emailAddress,
      password,
    });
  }

  public loginUsingFacebook(facebookUserAccessToken: string): Observable<any> {
    return this.http.post(`${this.resourceUrl}/login-facebook`, {
      facebookUserAccessToken,
    });
  }

  public forgotten(emailAddress: string): Observable<any> {
    return this.http.post(`${this.resourceUrl}/forgotten`, { emailAddress });
  }

  public resetPassword(formData: any): Observable<any> {
    return this.http.post(`${this.resourceUrl}/reset-password`, formData);
  }

  public register(formData: any): Observable<any> {
    return this.http.post(`${this.resourceUrl}/register`, formData);
  }

  public resendEmailAddressVerification(id: string): Observable<any> {
    return this.http.post(`${this.resourceUrl}/resend-email-verification`, {
      id,
    });
  }

  public verifyEmailAddress(
    emailAddressVerificationToken: string,
  ): Observable<any> {
    return this.http.post(`${this.resourceUrl}/verify-email`, {
      emailAddressVerificationToken,
    });
  }

  public destroyWithPassword(
    userId: string,
    password: string,
  ): Observable<any> {
    return this.http.post(`${this.resourceUrl}/delete-account`, {
      password,
      userId,
    });
  }
}
