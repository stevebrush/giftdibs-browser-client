import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

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
      });
  }

  public register(formData: any): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/register';
    return this.http
      .post(url, formData)
      .map((response: Response) => response.json());
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
