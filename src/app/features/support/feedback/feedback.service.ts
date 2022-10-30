import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Feedback } from './feedback';

@Injectable()
export class FeedbackService {
  private http: HttpClient;
  private resourceUrl = environment.apiUrl + '/feedback';

  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(this.handler);
  }

  public create(feedback: Feedback): Observable<any> {
    return this.http.post(`${this.resourceUrl}`, feedback);
  }
}
