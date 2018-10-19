import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  map,
  share
} from 'rxjs/operators';

import {
  environment
} from '@root/environments/environment';

import {
  WishList
} from './wish-list';

@Injectable()
export class WishListService {
  private resourceUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public create(formData: WishList): Observable<any> {
    return this.http.post(`${this.resourceUrl}/wish-lists`, formData);
  }

  public getById(wishListId: string): Observable<WishList> {
    return this.http.get(`${this.resourceUrl}/wish-lists/${wishListId}`)
      .pipe(
        map((result: any) => result.data.wishList),
        share()
      );
  }

  public getAllByUserId(userId: string): Observable<WishList[]> {
    return this.http.get(`${this.resourceUrl}/users/${userId}/wish-lists`)
      .pipe(
        map((result: any) => result.data.wishLists),
        share()
      );
  }

  public getArchivedByUserId(userId: string): Observable<WishList[]> {
    return this.http.get(`${this.resourceUrl}/users/${userId}/wish-lists/archived`)
      .pipe(
        map((result: any) => result.data.wishLists),
        share()
      );
  }

  public remove(wishListId: string): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/wish-lists/${wishListId}`);
  }

  public update(wishListId: string, formData: WishList): Observable<any> {
    return this.http.patch(`${this.resourceUrl}/wish-lists/${wishListId}`, formData);
  }
}
