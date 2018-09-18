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

import { environment } from '@root/environments/environment';

import {
  User
} from './user';

@Injectable()
export class UserService {
  private resourceUrl = environment.apiUrl + '/users';

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<User[]> {
    return this.http.get(this.resourceUrl)
      .pipe(
        map((result: any) => result.data.users),
        share()
      );
  }

  public getById(id: string): Observable<User> {
    return this.http.get(`${this.resourceUrl}/${id}`)
      .pipe(
        map((result: any) => result.data.user),
        share()
      );
  }

  public update(id: string, formData: User): Observable<any> {
    return this.http.patch(`${this.resourceUrl}/${id}`, formData);
  }
}
