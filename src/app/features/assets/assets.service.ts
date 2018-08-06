import {
  Injectable
} from '@angular/core';

import {
  HttpBackend,
  HttpClient,
  HttpHeaders
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

  private http: HttpClient;

  constructor(
    private authHttp: HttpClient, // client connected to auth interceptor
    private backend: HttpBackend
  ) {
    // This http client is not intercepted with auth headers.
    // (We do not want to send JWT to Amazon S3.)
    this.http = new HttpClient(this.backend);
  }

  public getSignedUrl(file: any): Observable<any> {
    console.log('getSignedUrl()', file);

    return this.authHttp.get(
      `${this.resourceUrl}/signed-url?fileName=${file.name}&fileType=${file.type}`
    );

    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/form-data');

    // const uploadData = new FormData();
    // uploadData.append('myFile', fileData, fileData.name);

    // return this.http.post(
    //   `${this.resourceUrl}/signed-url`,
    //   fileData,
    //   { headers }
    // );
  }

  public upload(
    file: any,
    signedRequest: string
  ): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'image/png; charset=utf-8'
    // });
    // const uploadData = new FormData();
    // uploadData.append('file', file, file.name);
    // return this.http.put(signedRequest, {
    //   uploadData
    //   // file
    // });
    // const subject = new Subject<any>();
    // return this.http.put(
    //   signedRequest,
    //   {
    //     file
    //   }
    // );

    return Observable.create((observer: Observer<any>) => {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('file?', file);
        const headers = new HttpHeaders({
          'Content-Type': 'image/png'
        });
        this.http.put(
          signedRequest,
          {
            file
          },
          {
            headers
          }
        ).subscribe(() => {
          observer.next({});
          observer.complete();
        });
      };
      reader.readAsBinaryString(file);
    });
  }
}
