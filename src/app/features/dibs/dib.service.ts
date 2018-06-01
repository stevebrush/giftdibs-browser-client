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
} from '../../../environments/environment';

import {
  Dib
} from './dib';

@Injectable()
export class DibService {
  private resourceUrl = environment.apiUrl + '/dibs';

  constructor(
    private http: HttpClient
  ) { }

  public create(formData: Dib): Observable<any> {
    return this.http.post(`${this.resourceUrl}`, formData);
  }

  public getAllRecipients(): Observable<any> {
    return this.http.get(`${this.resourceUrl}/recipients`)
      .pipe(
        map((result: any) => result.data),
        share()
      );
  }

  // public getAllByGiftId(giftId: string): Observable<Dib[]> {
  //   return this.http.get(`${this.resourceUrl}?giftId=${giftId}`)
  //     .pipe(
  //       map((result: any) => result.data.dibs),
  //       share()
  //     );
  // }

  // public getAllByWishListId(wishListId: string): Observable<Dib[]> {
  //   return this.http.get(`${this.resourceUrl}?wishListId=${wishListId}`)
  //     .pipe(
  //       map((result: any) => result.data.dibs),
  //       share()
  //     );
  // }

  // public getById(giftId: string): Observable<Dib> {
  //   return this.http.get(`${this.resourceUrl}/${giftId}`)
  //     .pipe(
  //       map((result: any) => result.data.gift),
  //       share()
  //     );
  // }

  public remove(dibId: string): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${dibId}`);
  }

  public update(dibId: string, formData: Dib): Observable<any> {
    return this.http.patch(`${this.resourceUrl}/${dibId}`, formData);
  }
}
