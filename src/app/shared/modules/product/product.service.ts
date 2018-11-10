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
} from '@root/environments/environment';

import {
  Product
} from './product';

@Injectable()
export class ProductService {
  private resourceUrl = environment.apiUrl + '/products';

  constructor(
    private http: HttpClient
  ) { }

  public findSimilarByAsin(asin: string): Observable<Product[]> {
    return this.http.get(`${this.resourceUrl}/similar?asin=${asin}`)
      .pipe(
        map((result: any) => result.data.results),
        share()
      );
  }

  public searchByKeyword(searchText: string): Observable<Product[]> {
    const encoded = encodeURIComponent(searchText);
    return this.http.get(`${this.resourceUrl}/search?query=${encoded}`)
      .pipe(
        map((result: any) => result.data.results),
        share()
      );
  }
}
