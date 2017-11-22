import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Dib } from '../_models';

@Injectable()
export class DibService {
  private resourceUrl = 'http://localhost:8080/v1/dibs';

  constructor(private http: HttpClient) { }

  public create(formData: Dib): Observable<any> {
    return this.http.post
      (this.resourceUrl, formData);
  }

  public getAllByWishListId(wishListId: string): Observable<any> {
    return this.http.get
      (`${this.resourceUrl}?wishListId=${wishListId}`);
  }

  public getAllRecipients(): Observable<any> {
    return this.http.get
      (`${this.resourceUrl}/recipients`);
  }

  public getById(id: string): Observable<any> {
    return this.http.get
      (`${this.resourceUrl}/${id}`);
  }

  public remove(id: string): Observable<any> {
    return this.http.delete
      (`${this.resourceUrl}/${id}`);
  }

  public update(formData: Dib): Observable<any> {
    return this.http.patch
      (`${this.resourceUrl}/${formData._id}`, formData);
  }
}
