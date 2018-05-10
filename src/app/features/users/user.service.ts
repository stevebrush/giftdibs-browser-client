import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { environment } from '../../../environments/environment';

import { User } from './user';

@Injectable()
export class UserService {
  private resourceUrl = environment.apiUrl + '/users';

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<User[]> {
    return this.http.get(this.resourceUrl)
      .map((result: any) => result.data.users)
      .share();
  }

  public getById(id: string): Observable<User> {
    return this.http.get(`${this.resourceUrl}/${id}`)
      .map((result: any) => result.data.user)
      .share();
  }

  public update(id: string, attributes: any): Observable<any> {
    return this.http.patch(`${this.resourceUrl}/${id}`, { attributes });
  }
}
