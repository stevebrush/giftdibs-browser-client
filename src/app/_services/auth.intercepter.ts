import {
  Injectable
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import {
  GDAlertService
} from '../_modules';

import {
  SessionService
} from './session.service';

@Injectable()
export class GDAuthInterceptor implements HttpInterceptor {
  constructor(
    private alertService: GDAlertService,
    private router: Router,
    private sessionService: SessionService
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.sessionService.token;

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `JWT ${token}`)
    });

    return next.handle(authReq)
      .do(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            const authResponse = event.body.authResponse;

            if (authResponse) {
              this.sessionService.setUser(authResponse.user);
              this.sessionService.token = authResponse.token;
            }
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              const routerOptions = {
                queryParams: {
                  redirectUrl: this.router.url
                }
              };
              this.alertService.error('You must be logged in to view that page.', true);
              this.router.navigate(['/login'], routerOptions);
            }
          }
        }
      );
  }
}
