import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { SessionService } from '../_services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private sessionService: SessionService) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.sessionService.token) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { redirectUrl: state.url }});

    return false;
  }
}
