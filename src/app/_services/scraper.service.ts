import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { WindowService } from './window.service';

@Injectable()
export class ScraperService {
  // 24 hours
  public dateScrapedRecommended = new Date().getTime() - (1000 * 60 * 60 * 24);

  private resourceUrl = 'http://localhost:8888/v1/scrape-product-url';

  constructor(
    private http: HttpClient,
    private windowService: WindowService
  ) { }

  public getProductDetailsFromUrl(url: string): Observable<any> {
    const encodedUrl = this.windowService.nativeWindow.encodeURIComponent(url).trim();

    return this.http.get
      (`${this.resourceUrl}/?url=${encodedUrl}`);
  }
}
