import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegistrationService {
  private resourceUrl = 'http://localhost:8080/v1/auth';

  constructor(
    private http: HttpClient
  ) { }

  public register(formData: any): Observable<any> {
    return this.http.post(`${this.resourceUrl}/register`, formData);
  }
}
