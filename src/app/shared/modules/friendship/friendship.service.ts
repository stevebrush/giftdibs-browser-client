import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Friendship } from './friendship';
import { FriendshipSummary } from './friendship-summary';

@Injectable({ providedIn: 'root' })
export class FriendshipService {
  private resourceUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public create(friendId: string): Observable<any> {
    return this.http.post(`${this.resourceUrl}/friendships`, { friendId });
  }

  public getAllByUserId(userId: string): Observable<FriendshipSummary> {
    return this.http
      .get(`${this.resourceUrl}/users/${userId}/friendships`)
      .pipe(
        map((result: any) => result.data.friendships),
        share()
      );
  }

  public getFollowingByUserId(userId: string): Observable<Friendship[]> {
    return this.http
      .get(`${this.resourceUrl}/users/${userId}/friendships/following`)
      .pipe(
        map((result: any) => result.data.friendships),
        share()
      );
  }

  public remove(friendshipId: string): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/friendships/${friendshipId}`);
  }
}
