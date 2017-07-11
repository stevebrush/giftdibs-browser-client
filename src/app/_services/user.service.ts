import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
  constructor(
    private http: Http) { }

  public getAll(): Observable<any> {
    const url = 'http://localhost:8080/v1/users';
    const token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new Headers({ 'Authorization': `JWT ${token.token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .get(url, options)
      .map((response: Response) => response.json())
      .catch((err: Response) => {
        const details = err.json();
        return Observable.throw(details);
      });
  }

  public remove(id: string): Observable<any> {
    const url = 'http://localhost:8080/v1/users';
    const token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new Headers({ 'Authorization': `JWT ${token.token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .delete(`${url}/${id}`, options)
      .map((response: Response) => response.json())
      .catch((err: Response) => {
        const details = err.json();
        return Observable.throw(details);
      });
  }
}
