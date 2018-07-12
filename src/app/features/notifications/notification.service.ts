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
  Notification
} from './notification';

@Injectable()
export class NotificationService {
  private resourceUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<Notification[]> {
    return this.http.get(`${this.resourceUrl}/notifications`)
      .pipe(
        map((result: any) => result.data.notifications),
        share()
      );
  }

  public remove(notificationId: string): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/notifications/${notificationId}`);
  }
}
