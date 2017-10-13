import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';

import { SessionService } from './session.service';
import { AlertService } from './alert.service';
import { Gift } from '../_models';

@Injectable()
export class GiftService {
  private resourceUrl = 'http://localhost:8080/v1/gifts';

  constructor(
    private http: Http,
    private router: Router,
    private alertService: AlertService,
    private sessionService: SessionService) { }

  public getAll(): Observable<any> {
    const options = this.getRequestOptions();

    return this.http
      .get(this.resourceUrl, options)
      .map((response: Response) => this.handleSuccess(response))
      .catch((err: any) => this.handleError(err));
  }

  public getAllByWishListId(wishListId: string): Observable<Gift[]> {
    const options = this.getRequestOptions();

    return this.http
      .get(`${this.resourceUrl}?wishListId=${wishListId}`, options)
      .map((response: Response) => this.handleSuccess(response))
      .catch((err: any) => this.handleError(err));
  }

  public create(formData: Gift): Observable<any> {
    const options = this.getRequestOptions();

    return this.http
      .post(`${this.resourceUrl}`, formData, options)
      .map((response: Response) => this.handleSuccess(response))
      .catch((err) => this.handleError(err));
  }

  public remove(giftId: string): Observable<any> {
    const options = this.getRequestOptions();

    return this.http
      .delete(`${this.resourceUrl}/${giftId}`, options)
      .map((response: Response) => this.handleSuccess(response))
      .catch((err) => this.handleError(err));
  }

  public update(formData: Gift): Observable<any> {
    const options = this.getRequestOptions();

    return this.http
      .patch(`${this.resourceUrl}/${formData._id}`, formData, options)
      .map((response: Response) => this.handleSuccess(response))
      .catch((err) => this.handleError(err));
  }

  private getRequestOptions(): RequestOptions {
    const token = this.sessionService.token;
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    const options = new RequestOptions({ headers });
    return options;
  }

  private handleSuccess(response: Response): any {
    const json = response.json();

    if (json.authResponse) {
      this.sessionService.setUser(json.authResponse.user);
      this.sessionService.token = json.authResponse.token;
    }

    return json;
  }

  private handleError(err: Response): ErrorObservable {
    if (err.status === 401) {
      const routerOptions = {
        queryParams: {
          redirectUrl: this.router.url
        }
      };
      this.alertService.error('You must be logged in to view that page.', true);
      this.router.navigate(['/login'], routerOptions);
    }

    const details = err.json();
    return Observable.throw(details);
  }
}
