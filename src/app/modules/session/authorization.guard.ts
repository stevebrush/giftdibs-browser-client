import {
  Injectable
} from '@angular/core';

import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { SessionService } from './session.service';
import { AlertService } from '../alert/alert.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private alertService: AlertService,
    private router: Router,
    private sessionService: SessionService
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.sessionService.isLoggedIn) {
      return true;
    }

    this.alertService.info('Please log in to view that page.', true);
    this.router.navigate(['/account', 'login'], {
      queryParams: {
        redirectUrl: state.url
      }
    });

    return false;
  }
}
