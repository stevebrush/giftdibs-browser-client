import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
  private resourceUrl = 'http://localhost:8080/v1/users';

  constructor(
    private http: Http) { }

  public getAll(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new Headers({ 'Authorization': `JWT ${user.token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .get(this.resourceUrl, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getById(id: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new Headers({ 'Authorization': `JWT ${user.token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .get(`${this.resourceUrl}/${id}`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public remove(id: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new Headers({ 'Authorization': `JWT ${user.token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .delete(`${this.resourceUrl}/${id}`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public update(data: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new Headers({ 'Authorization': `JWT ${user.token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .patch(`${this.resourceUrl}/${data._id}`, data, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(err: Response): ErrorObservable {
    const details = err.json();
    return Observable.throw(details);
  }
}
