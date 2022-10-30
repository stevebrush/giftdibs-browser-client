import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Gift } from './gift';

@Injectable()
export class GiftService {
  private resourceUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public create(wishListId: string, formData: Gift): Observable<any> {
    return this.http.post(
      `${this.resourceUrl}/wish-lists/${wishListId}/gifts`,
      formData,
    );
  }

  public getAll(startIndex?: number): Observable<Gift[]> {
    const paginate = startIndex ? `?startIndex=${startIndex}` : '';
    return this.http.get(`${this.resourceUrl}/gifts${paginate}`).pipe(
      map((result: any) => {
        return result.data.gifts.map((g: Gift) => this.prepare(g));
      }),
      share(),
    );
  }

  public getById(giftId: string): Observable<Gift> {
    return this.http.get(`${this.resourceUrl}/gifts/${giftId}`).pipe(
      map((result: any) => this.prepare(result.data.gift)),
      share(),
    );
  }

  public remove(giftId: string): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/gifts/${giftId}`);
  }

  public update(giftId: string, formData: Gift): Observable<any> {
    // The endpoint needs the wish list's ID to be
    // sent as `wishListId`.
    if (formData.wishList && formData.wishList.id) {
      (formData as any).wishListId = formData.wishList.id;
    }

    return this.http.patch(`${this.resourceUrl}/gifts/${giftId}`, formData);
  }

  public markAsReceived(giftId: string): Observable<any> {
    return this.http.patch(`${this.resourceUrl}/gifts/${giftId}/received`, {});
  }

  private prepare(gift: Gift): Gift {
    const associatesTag = 'giftdibs-20';

    if (!gift.externalUrls) {
      return gift;
    }

    gift.externalUrls.forEach((externalUrl) => {
      if (externalUrl.url.indexOf('amazon.com') > -1) {
        if (externalUrl.url.indexOf('?') > -1) {
          externalUrl.url += `&tag=${associatesTag}`;
        } else {
          externalUrl.url += `?tag=${associatesTag}`;
        }
      }
    });

    return gift;
  }
}
