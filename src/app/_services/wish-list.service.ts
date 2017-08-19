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
import { Gift, WishList } from '../_models';

@Injectable()
export class WishListService {
  private resourceUrl = 'http://localhost:8080/v1/wish-lists';

  constructor(
    private http: Http,
    private router: Router,
    private alertService: AlertService,
    private sessionService: SessionService) { }

  public create(formData: WishList): Observable<any> {
    const token = this.sessionService.token;
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .post(this.resourceUrl, formData, options)
      .map((response: Response) => this.handleSuccess(response))
      .catch((err: any) => this.handleError(err));
  }

  public getAll(): Observable<any> {
    const token = this.sessionService.token;
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .get(this.resourceUrl, options)
      .map((response: Response) => this.handleSuccess(response))
      .catch((err: any) => this.handleError(err));
  }

  public getAllByUserId(userId: string): Observable<any> {
    const token = this.sessionService.token;
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .get(`${this.resourceUrl}?userId=${userId}`, options)
      .map((response: Response) => this.handleSuccess(response))
      .catch((err: any) => this.handleError(err));
  }

  public getById(id: string): Observable<any> {
    const token = this.sessionService.token;
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .get(`${this.resourceUrl}/${id}`, options)
      .map((response: Response) => this.handleSuccess(response))
      .catch((err) => this.handleError(err));
  }

  public remove(id: string): Observable<any> {
    const token = this.sessionService.token;
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .delete(`${this.resourceUrl}/${id}`, options)
      .map((response: Response) => this.handleSuccess(response))
      .catch((err) => this.handleError(err));
  }

  public update(formData: WishList): Observable<any> {
    const token = this.sessionService.token;
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .patch(`${this.resourceUrl}/${formData._id}`, formData, options)
      .map((response: Response) => this.handleSuccess(response))
      .catch((err) => this.handleError(err));
  }

  public addGift(wishListId: string, formData: Gift): Observable<any> {
    const token = this.sessionService.token;
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .post(`${this.resourceUrl}/${wishListId}/gifts/`, formData, options)
      .map((response: Response) => this.handleSuccess(response))
      .catch((err) => this.handleError(err));
  }

  public removeGift(wishListId: string, giftId: string): Observable<any> {
    const token = this.sessionService.token;
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .delete(`${this.resourceUrl}/${wishListId}/gifts/${giftId}`, options)
      .map((response: Response) => this.handleSuccess(response))
      .catch((err) => this.handleError(err));
  }

  public updateGift(wishListId: string, formData: Gift): Observable<any> {
    const token = this.sessionService.token;
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    const options = new RequestOptions({ headers });

    return this.http
      .patch(`${this.resourceUrl}/${wishListId}/gifts/${formData._id}`, formData, options)
      .map((response: Response) => this.handleSuccess(response))
      .catch((err) => this.handleError(err));
  }

  private handleSuccess(response: Response): any {
    const json = response.json();

    if (json.authResponse) {
      this.sessionService.setUser(json.authResponse.user);
      this.sessionService.token = json.authResponse.token;
    }

    return json as WishList;
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
