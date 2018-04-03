import {
  Injectable
} from '@angular/core';

import {
  CanLoad
} from '@angular/router';

import { SessionService } from './session.service';

@Injectable()
export class IsLoggedOutGuard implements CanLoad {
  constructor(
    private sessionService: SessionService
  ) { }

  public canLoad(): boolean  {
    console.log('IsLoggedOutGuard', !this.sessionService.isLoggedIn);
    return (!this.sessionService.isLoggedIn);
  }
}
