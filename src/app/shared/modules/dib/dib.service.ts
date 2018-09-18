import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  environment
} from '@root/environments/environment';

import {
  Observable
} from 'rxjs';

import {
  map,
  share
} from 'rxjs/operators';

import {
  Dib
} from './dib';

@Injectable()
export class DibService {
  private resourceUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public create(
    giftId: string,
    formData: Dib
  ): Observable<any> {
    return this.http.post(`${this.resourceUrl}/gifts/${giftId}/dibs`, formData);
  }

  public getAllRecipients(): Observable<any> {
    return this.http.get(`${this.resourceUrl}/dibs/recipients`)
      .pipe(
        map((result: any) => result.data),
        share()
      );
  }

  public markAsDelivered(dibId: string): Observable<any> {
    return this.http.post(`${this.resourceUrl}/dibs/${dibId}/delivery`, {});
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
    return this.http.delete(`${this.resourceUrl}/dibs/${dibId}`);
  }

  public update(dibId: string, formData: Dib): Observable<any> {
    return this.http.patch(`${this.resourceUrl}/dibs/${dibId}`, formData);
  }
}
