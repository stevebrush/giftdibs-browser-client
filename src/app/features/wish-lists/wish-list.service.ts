import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { environment } from '../../../environments/environment';

import { WishList } from './wish-list';

@Injectable()
export class WishListService {
  private resourceUrl = environment.apiUrl + '/wish-lists';

  constructor(
    private http: HttpClient
  ) { }

  public create(formData: WishList): Observable<any> {
    return this.http.post(`${this.resourceUrl}`, {
      attributes: formData
    });
  }

  public getById(wishListId: string): Observable<WishList> {
    return this.http.get(`${this.resourceUrl}/${wishListId}`)
      .map((result: any) => {
        return result.data.wishList;
      })
      .share();
  }

  public getAllByUserId(userId: string): Observable<WishList[]> {
    return this.http.get(`${this.resourceUrl}?userId=${userId}`)
      .map((result: any) => {
        return result.data.wishLists;
      })
      .share();
  }

  public remove(wishListId: string): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${wishListId}`);
  }

  public update(wishListId: string, formData: WishList): Observable<any> {
    return this.http.patch(`${this.resourceUrl}/${wishListId}`, {
      attributes: formData
    });
  }
}
