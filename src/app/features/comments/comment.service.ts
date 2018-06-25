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
  Comment
} from './comment';

@Injectable()
export class CommentService {
  private resourceUrl = environment.apiUrl + '/comments';

  constructor(
    private http: HttpClient
  ) { }

  public create(
    giftId: string,
    formData: Comment
  ): Observable<any> {
    const reqBody: any = formData;
    reqBody.giftId = giftId;
    return this.http.post(`${this.resourceUrl}`, reqBody);
  }

  public getAllByGiftId(giftId: string): Observable<Comment[]> {
    return this.http.get(`${this.resourceUrl}?giftId=${giftId}`)
      .pipe(
        map((result: any) => result.data.comments),
        share()
      );
  }

  public getById(commentId: string): Observable<Comment> {
    return this.http.get(`${this.resourceUrl}/${commentId}`)
      .pipe(
        map((result: any) => result.data.comment),
        share()
      );
  }

  public remove(commentId: string): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${commentId}`);
  }

  public update(commentId: string, formData: Comment): Observable<any> {
    return this.http.patch(`${this.resourceUrl}/${commentId}`, formData);
  }
}
