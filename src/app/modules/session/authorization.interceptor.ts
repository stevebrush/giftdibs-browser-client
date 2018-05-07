import {
  Injectable
} from '@angular/core';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';

import { SessionService } from './session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private sessionService: SessionService
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.sessionService.token;

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `JWT ${token}`)
    });

    // Automatically saves the returned token.
    // Automatically attaches the JWT to every request.
    return next.handle(authReq)
      .do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const authResponse = event.body.authResponse;
          if (authResponse) {
            this.sessionService.user = authResponse.user;
            this.sessionService.token = authResponse.token;
          }
        }
      });
  }
}
