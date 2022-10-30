import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { User } from 'src/app/shared/modules/user';
import { environment } from 'src/environments/environment';

@Injectable()
export class SearchService {
  private resourceUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public searchUsers(searchText: string): Observable<User[]> {
    const encoded = encodeURIComponent(searchText);
    return this.http.get(`${this.resourceUrl}/users?search=${encoded}`).pipe(
      map((result: any) => result.data.results),
      share(),
    );
  }
}
