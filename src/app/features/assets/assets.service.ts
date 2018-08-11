import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  Observer
} from 'rxjs';

import {
  environment
} from '../../../environments/environment';

@Injectable()
export class AssetsService {
  private resourceUrl = environment.apiUrl + '/assets';

  constructor(
    private http: HttpClient
  ) { }

  public uploadAvatar(file: any): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      const data = new FormData();
      data.append('file', file);

      this.http.post(
        `${this.resourceUrl}/avatar`,
        data
      ).subscribe(
        (result: any) => {
          observer.next(result);
          observer.complete();
        },
        (err: any) => {
          observer.error(err);
          observer.complete();
        }
      );
    });
  }

  public removeAvatar(): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/avatar`);
  }
}
