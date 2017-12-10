import { Injectable } from '@angular/core';

import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { GDAlertService } from '../_modules';

import { SessionService } from '../_services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private alertService: GDAlertService,
    private sessionService: SessionService) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.sessionService.token) {
      return true;
    }

    this.alertService.error('Please log in to view that page.', true);
    this.router.navigate(['/login'], { queryParams: { redirectUrl: state.url }});

    return false;
  }
}
