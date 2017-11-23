import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { User } from '../_models/user';

@Injectable()
export class UserService {
  private resourceUrl = 'http://localhost:8080/v1/users';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<User[]> {
    return this.http
      .get(this.resourceUrl)
      .mergeMap((data: any) => Observable.of(data.users));
  }

  public getById(id: string): Observable<User> {
    return this.http
      .get(`${this.resourceUrl}/${id}`)
      .mergeMap((data: any) => Observable.of(data.user));
  }

  public remove(id: string): Observable<any> {
    return this.http.delete
      (`${this.resourceUrl}/${id}`);
  }

  public update(data: any): Observable<any> {
    return this.http.patch
      (`${this.resourceUrl}/${data._id}`, data);
  }
}
