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

import { environment } from '../../../environments/environment';

import { User } from '../../features/users/user';

@Injectable()
export class SearchService {
  private resourceUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public searchUsers(searchText: string): Observable<User[]> {
    const encoded = encodeURIComponent(searchText);
    return this.http.get(`${this.resourceUrl}/users?search=${encoded}`)
      .pipe(
        map((result: any) => result.data.results),
        share()
      );
  }
}
