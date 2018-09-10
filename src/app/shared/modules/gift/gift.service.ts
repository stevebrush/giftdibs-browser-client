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
  Gift
} from './gift';

@Injectable()
export class GiftService {
  private resourceUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public create(
    wishListId: string,
    formData: Gift
  ): Observable<any> {
    return this.http.post(`${this.resourceUrl}/wish-lists/${wishListId}/gifts`, formData);
  }

  public getAll(): Observable<Gift[]> {
    return this.http.get(`${this.resourceUrl}/gifts`)
      .pipe(
        map((result: any) => result.data.gifts),
        share()
      );
  }

  public getById(giftId: string): Observable<Gift> {
    return this.http.get(`${this.resourceUrl}/gifts/${giftId}`)
      .pipe(
        map((result: any) => result.data.gift),
        share()
      );
  }

  public remove(giftId: string): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/gifts/${giftId}`);
  }

  public update(giftId: string, formData: Gift): Observable<any> {
    return this.http.patch(`${this.resourceUrl}/gifts/${giftId}`, formData);
  }

  public markAsReceived(giftId: string): Observable<any> {
    return this.http.patch(`${this.resourceUrl}/gifts/${giftId}/received`, {});
  }
}
