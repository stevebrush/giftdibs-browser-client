import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from './user';
import { UserService } from './services';

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(private userService: UserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    const id = +route.params['id'];
    return this.userService.getById(id);
  }
}
