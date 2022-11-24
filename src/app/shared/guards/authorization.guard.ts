import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SessionService } from '@giftdibs/session';
import { AlertService, WindowRefService } from '@giftdibs/ux';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private alertService: AlertService,
    private router: Router,
    private sessionService: SessionService,
    private windowRef: WindowRefService
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.validateOrRedirect(state.url);
  }

  // Using native Window pathname until Angular provides query params in route:
  // https://github.com/angular/angular/issues/12411
  public canLoad(route: Route): boolean {
    const url = this.windowRef.nativeWindow.location.pathname;
    return this.validateOrRedirect(url);
  }

  private validateOrRedirect(redirectUrl: string): boolean {
    if (this.sessionService.isLoggedIn) {
      return true;
    }

    this.alertService.info('Please log in to view that page.', true);
    this.router.navigate(['/account', 'login'], {
      queryParams: {
        redirectUrl,
      },
    });

    return false;
  }
}
