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

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.sessionService.token) {
      return true;
    }

    alert('Please log in to view that page.');
    this.router.navigate(['/login'], { queryParams: { redirectUrl: state.url }});

    return false;
  }
}
