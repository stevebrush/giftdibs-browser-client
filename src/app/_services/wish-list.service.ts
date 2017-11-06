import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { WishList } from '../_models';

@Injectable()
export class WishListService {
  private resourceUrl = 'http://localhost:8080/v1/wish-lists';

  constructor(private http: HttpClient) { }

  public create(formData: WishList): Observable<any> {
    return this.http.post
      (this.resourceUrl, formData);
  }

  public getAll(): Observable<any> {
    return this.http.get
      (this.resourceUrl);
  }

  public getAllByUserId(userId: string): Observable<any> {
    return this.http.get
      (`${this.resourceUrl}?userId=${userId}`);
  }

  public getById(id: string): Observable<any> {
    return this.http.get
      (`${this.resourceUrl}/${id}`);
  }

  public remove(id: string): Observable<any> {
    return this.http.delete
      (`${this.resourceUrl}/${id}`);
  }

  public update(formData: WishList): Observable<any> {
    return this.http.patch
      (`${this.resourceUrl}/${formData._id}`, formData);
  }
}
