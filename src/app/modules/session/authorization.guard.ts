import {
  Injectable
} from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import {
  AlertService
} from '../alert';

import { SessionService } from './session.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private alertService: AlertService,
    private router: Router,
    private sessionService: SessionService
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.validateOrRedirect(state.url);
  }

  public canLoad(route: Route): boolean {
    return this.validateOrRedirect('/' + route.path);
  }

  private validateOrRedirect(redirectUrl: string): boolean {
    if (this.sessionService.isLoggedIn) {
      return true;
    }

    this.alertService.info('Please log in to view that page.', true);
    this.router.navigate(['/account', 'login'], {
      queryParams: {
        redirectUrl
      }
    });

    return false;
  }
}
