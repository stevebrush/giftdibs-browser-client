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
} from '../../../../environments/environment';

import {
  Gift
} from './gift';

@Injectable()
export class GiftService {
  private resourceUrl = environment.apiUrl + '/gifts';

  constructor(
    private http: HttpClient
  ) { }

  public create(wishListId: string, formData: Gift): Observable<any> {
    const reqBody: any = formData;
    reqBody.wishListId = wishListId;
    return this.http.post(`${this.resourceUrl}`, reqBody);
  }

  public getById(giftId: string): Observable<Gift> {
    return this.http.get(`${this.resourceUrl}/${giftId}`)
      .pipe(
        map((result: any) => result.data.gift),
        share()
      );
  }

  public remove(giftId: string): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${giftId}`);
  }

  public update(giftId: string, formData: Gift): Observable<any> {
    return this.http.patch(`${this.resourceUrl}/${giftId}`, formData);
  }
}
