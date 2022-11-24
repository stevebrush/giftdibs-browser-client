import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { UrlScraperResult } from './url-scraper-result';

@Injectable()
export class UrlScraperService {
  private http: HttpClient;
  private resourceUrl = environment.scraperUrl;

  constructor(private httpBackend: HttpBackend) {
    // Need to create a new backend to allow this service
    // to ignore the auth interceptor.
    this.http = new HttpClient(this.httpBackend);
  }

  public getProduct(url: string): Observable<UrlScraperResult> {
    const encoded = encodeURIComponent(url);
    return this.http.get(`${this.resourceUrl}/products?url=${encoded}`).pipe(
      map((result: any) => result.product),
      share()
    );
  }
}
