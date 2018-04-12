import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

import { User } from '../../lazy/users/user';

@Injectable()
export class SearchService {
  private resourceUrl = environment.apiUrl + '/search';

  constructor(
    private http: HttpClient
  ) { }

  public searchUsers(searchText: string): Observable<User[]> {
    const encoded = encodeURIComponent(searchText);
    return this.http.get(`${this.resourceUrl}-users/${encoded}`)
      .map((result: any) => result.data.results);
  }
}
