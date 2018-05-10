import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { environment } from '../../../../environments/environment';

import { Friendship } from './friendship';

@Injectable()
export class FriendshipService {
  private resourceUrl = environment.apiUrl + '/friendships';

  constructor(
    private http: HttpClient
  ) { }

  public create(friendId: string): Observable<any> {
    return this.http.post(`${this.resourceUrl}`, { attributes: { friendId } });
  }

  public getAllByUserId(userId: string): Observable<Friendship[]> {
    return this.http.get(`${this.resourceUrl}?userId=${userId}`)
      .map((result: any) => result.data.friendships)
      .share();
  }

  public remove(friendshipId: string): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${friendshipId}`);
  }
}
