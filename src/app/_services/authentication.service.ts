import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor(
    private http: Http) { }

  public login(emailAddress: string, password: string): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/login';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this.http.post(url, { emailAddress, password }, options)
      .map((response: Response) => {
        const user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  public register(formData: any): Observable<any> {
    const url = 'http://localhost:8080/v1/auth/register';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    console.log('formData:', formData);

    return this.http.post(url, formData, options)
      .map((response: Response) => {
        const data = response.json();
        console.log('data?', data);
        return data;
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
