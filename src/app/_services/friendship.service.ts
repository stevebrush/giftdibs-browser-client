import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Friendship } from '../_models';

@Injectable()
export class FriendshipService {
  private resourceUrl = 'http://localhost:8080/v1/friendships';

  constructor(private http: HttpClient) { }

  public getAllByUserId(userId: string): Observable<any> {
    return this.http.get
      (`${this.resourceUrl}?userId=${userId}`);
  }

  public create(formData: Friendship): Observable<any> {
    return this.http.post
      (`${this.resourceUrl}`, formData);
  }

  public remove(friendshipId: string): Observable<any> {
    return this.http.delete
      (`${this.resourceUrl}/${friendshipId}`);
  }

  public update(formData: Friendship): Observable<any> {
    return this.http.patch
      (`${this.resourceUrl}/${formData._id}`, formData);
  }
}
