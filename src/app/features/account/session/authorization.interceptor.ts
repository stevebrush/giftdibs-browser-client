import {
  Injectable
} from '@angular/core';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import {
  Router
} from '@angular/router';

import {
  Observable
} from 'rxjs';

import {
  tap
} from 'rxjs/operators';

import {
  SessionService
} from './session.service';
import { SessionUser } from './session-user';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.sessionService.token;

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `JWT ${token}`)
    });

    // Automatically saves the returned token.
    // Automatically attaches the JWT to every request.
    return next.handle(authReq)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              const authResponse = event.body.authResponse;
              if (authResponse) {
                const sessionUser: SessionUser = {
                  id: authResponse.user.id,
                  firstName: authResponse.user.first_name,
                  lastName: authResponse.user.last_name,
                  emailAddressVerified: authResponse.user.email_address_verified
                };
                this.sessionService.user = sessionUser;
                this.sessionService.token = authResponse.token;
              }
            }
          },
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {

                // Don't redirect if checking refresh token
                // (this is handled by app-startup service)
                if (err.url.indexOf('refresh-token') > -1) {
                  return;
                }

                const routerOptions = {
                  queryParams: {
                    redirectUrl: this.router.url
                  }
                };

                this.router.navigate(['/account', 'login'], routerOptions);
              }
            }
          }
        )
      );
  }
}
