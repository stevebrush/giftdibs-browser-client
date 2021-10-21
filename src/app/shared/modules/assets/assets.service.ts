import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@root/environments/environment';

import { Observable, Observer } from 'rxjs';

@Injectable()
export class AssetsService {
  private resourceUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public uploadAvatar(file: any): Observable<any> {
    return this.uploadFile(file, `${this.resourceUrl}/avatars`);
  }

  public removeAvatar(): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/avatars`);
  }

  public uploadGiftThumbnail(file: any, giftId: string): Observable<any> {
    return this.uploadFile(
      file,
      `${this.resourceUrl}/gifts/${giftId}/thumbnails`,
    );
  }

  public removeGiftThumbnail(giftId: string): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/gifts/${giftId}/thumbnails`);
  }

  private uploadFile(file: any, url: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      const data = new FormData();
      data.append('file', file);

      this.http.post(url, data).subscribe(
        (result: any) => {
          observer.next(result);
          observer.complete();
        },
        (err: any) => {
          observer.error(err);
          observer.complete();
        },
      );
    });
  }
}
