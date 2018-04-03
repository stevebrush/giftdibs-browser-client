import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {
  private resourceUrl = environment.apiUrl + '/auth';

  constructor(
    private http: HttpClient
  ) { }

  public login(emailAddress: string, password: string): Observable<any> {
    return this.http.post<any>
      (`${this.resourceUrl}/login`, { emailAddress, password });
  }

  public loginUsingFacebook(facebookUserAccessToken: string): Observable<any> {
    return this.http.post<any>
      (`${this.resourceUrl}/login-facebook`, { facebookUserAccessToken });
  }

  public forgotten(emailAddress: string): Observable<any> {
    return this.http.post<any>
      (`${this.resourceUrl}/forgotten`, { emailAddress });
  }

  public resetPassword(formData: any): Observable<any> {
    return this.http.post<any>
      (`${this.resourceUrl}/reset-password`, formData);
  }
}
