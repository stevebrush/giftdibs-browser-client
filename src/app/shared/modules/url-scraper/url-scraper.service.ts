import {
  Injectable
} from '@angular/core';

import {
  HttpBackend,
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  map,
  share
} from 'rxjs/operators';

import { environment } from '@root/environments/environment';

import { UrlScraperResult } from './url-scraper-result';

@Injectable()
export class UrlScraperService {
  private http: HttpClient;
  private resourceUrl = environment.scraperUrl;

  constructor(
    private httpBackend: HttpBackend
  ) {
    // Need to create a new backend to allow this service
    // to ignore the auth interceptor.
    this.http = new HttpClient(this.httpBackend);
  }

  public getProduct(url: string): Observable<UrlScraperResult> {
    const encoded = encodeURIComponent(url);
    return this.http.get(`${this.resourceUrl}/products?url=${encoded}`)
      .pipe(
        map((result: any) => result.product),
        share()
      );
  }

  // public getProducts(urls: string[]): Observable<UrlScraperResult[]> {
  //   return this.http.post(`${this.resourceUrl}/products`, {
  //     urls: JSON.stringify(urls)
  //   })
  //     .pipe(
  //       map((result: any) => result.products),
  //       share()
  //     );
  // }

  // public getImages(url: string): Observable<UrlScraperResult> {
  //   const encoded = encodeURIComponent(url);
  //   return this.http.get(`${this.resourceUrl}/images?url=${encoded}`)
  //     .pipe(
  //       map((result: any) => {
  //         return {
  //           images: result.images
  //         };
  //       }),
  //       share()
  //     );
  // }
}
