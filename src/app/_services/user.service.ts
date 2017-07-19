import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';

import { SessionService } from './session.service';

@Injectable()
export class UserService {
  private resourceUrl = 'http://localhost:8080/v1/users';

  constructor(
    private http: Http,
    private router: Router,
    private sessionService: SessionService) { }

  public getAll(): Observable<any> {
    const token = this.sessionService.token;
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .get(this.resourceUrl, options)
      .map((response: Response) => response.json())
      .catch((err) => this.handleError(err));
  }

  public getById(id: string): Observable<any> {
    const token = this.sessionService.token;
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .get(`${this.resourceUrl}/${id}`, options)
      .map((response: Response) => response.json())
      .catch((err) => this.handleError(err));
  }

  public remove(id: string): Observable<any> {
    const token = this.sessionService.token;
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .delete(`${this.resourceUrl}/${id}`, options)
      .map((response: Response) => response.json())
      .catch((err) => this.handleError(err));
  }

  public update(data: any): Observable<any> {
    const token = this.sessionService.token;
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .patch(`${this.resourceUrl}/${data._id}`, data, options)
      .map((response: Response) => response.json())
      .catch((err) => this.handleError(err));
  }

  private handleError(err: Response): ErrorObservable {
    if (err.status === 401) {
      const routerOptions = {
        queryParams: {
          redirectUrl: this.router.url
        }
      };
      this.router.navigate(['/login'], routerOptions);
      return;
    }

    const details = err.json();
    return Observable.throw(details);
  }
}
