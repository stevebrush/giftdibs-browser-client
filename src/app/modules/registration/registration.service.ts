import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegistrationService {
  private resourceUrl = environment.apiUrl + '/auth';

  constructor(
    private http: HttpClient
  ) { }

  public register(formData: any): Observable<any> {
    return this.http.post(`${this.resourceUrl}/register`, formData);
  }
}
