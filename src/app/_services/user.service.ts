import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private resourceUrl = 'http://localhost:8080/v1/users';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get
      (this.resourceUrl);
  }

  public getById(id: string): Observable<any> {
    return this.http.get
      (`${this.resourceUrl}/${id}`);
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
