import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  environment
} from '../../../environments/environment';

@Injectable()
export class AccountService {
  private resourceUrl = environment.apiUrl + '/auth';

  constructor(
    private http: HttpClient
  ) { }

  public login(emailAddress: string, password: string): Observable<any> {
    return this.http.post(`${this.resourceUrl}/login`, {
      email_address: emailAddress,
      password
    });
  }

  public forgotten(emailAddress: string): Observable<any> {
    return this.http.post(`${this.resourceUrl}/forgotten`, {
      email_address: emailAddress
    });
  }

  public resetPassword(formData: any): Observable<any> {
    return this.http.post(`${this.resourceUrl}/reset-password`, formData);
  }

  public register(formData: any): Observable<any> {
    return this.http.post(`${this.resourceUrl}/register`, formData);
  }

  public resendEmailAddressVerification(id: string): Observable<any> {
    return this.http.post(`${this.resourceUrl}/resend-email-verification`, { id });
  }

  public verifyEmailAddress(emailAddressVerificationToken: string): Observable<any> {
    return this.http.post(`${this.resourceUrl}/verify-email`, {
      email_address_verification_token: emailAddressVerificationToken
    });
  }

  public destroyWithPassword(userId: string, password: string): Observable<any> {
    return this.http.post(`${this.resourceUrl}/delete-account`, {
      password,
      member_id: userId
    });
  }
}
