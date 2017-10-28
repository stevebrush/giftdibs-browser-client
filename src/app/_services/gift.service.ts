import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Gift } from '../_models';

@Injectable()
export class GiftService {
  private resourceUrl = 'http://localhost:8080/v1/gifts';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get
      (this.resourceUrl);
  }

  public getAllByWishListId(wishListId: string): Observable<any> {
    return this.http.get
      (`${this.resourceUrl}?wishListId=${wishListId}`);
  }

  public create(formData: Gift): Observable<any> {
    return this.http.post
      (`${this.resourceUrl}`, formData);
  }

  public remove(giftId: string): Observable<any> {
    return this.http.delete
      (`${this.resourceUrl}/${giftId}`);
  }

  public update(formData: Gift): Observable<any> {
    return this.http.patch
      (`${this.resourceUrl}/${formData._id}`, formData);
  }
}
