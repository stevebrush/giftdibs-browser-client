import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Http,
  // Headers,
  Response,
  // RequestOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';

import { SessionService } from './session.service';
import { AlertService } from './alert.service';
import { WindowService } from './window.service';

@Injectable()
export class ScraperService {
  // 24 hours
  public dateScrapedRecommended = new Date().getTime() - (1000 * 60 * 60 * 24);

  private resourceUrl = 'http://localhost:8888/v1/scrape-product-url';

  constructor(
    private http: Http,
    private router: Router,
    private alertService: AlertService,
    private windowService: WindowService,
    private sessionService: SessionService) { }

  public getProductDetailsFromUrl(url: string): Observable<any> {
    // const token = this.sessionService.token;
    // const headers = new Headers({ 'Authorization': `JWT ${token}` });
    // const options = new RequestOptions({ headers });
    const encodedUrl = this.windowService.nativeWindow.encodeURIComponent(url).trim();

    return this.http
      .get(`${this.resourceUrl}/?url=${encodedUrl}`)
      .map((response: Response) => this.handleSuccess(response))
      .catch((err: any) => this.handleError(err));
  }

  private handleSuccess(response: Response): any {
    const json = response.json();

    if (json.authResponse) {
      this.sessionService.setUser(json.authResponse.user);
      this.sessionService.token = json.authResponse.token;
    }

    return json;
  }

  private handleError(err: Response): ErrorObservable {
    if (err.status === 401) {
      const routerOptions = {
        queryParams: {
          redirectUrl: this.router.url
        }
      };
      this.alertService.error('You must be logged in to view that page.', true);
      this.router.navigate(['/login'], routerOptions);
    }

    const details = err.json();
    return Observable.throw(details);
  }
}
