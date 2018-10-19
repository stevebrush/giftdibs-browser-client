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

@Injectable()
export class ProductService {
  private resourceUrl = environment.apiUrl + '/products/search';

  constructor(
    private http: HttpClient
  ) { }

  public searchByKeyword(searchText: string): Observable<any> {
    const encoded = encodeURIComponent(searchText);
    return this.http.get(`${this.resourceUrl}?query=${encoded}`)
      .pipe(
        map((result: any) => result.data.results),
        share()
      );
  }
}
