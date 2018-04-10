import {
  Injectable,
  OnDestroy
} from '@angular/core';

import {
  NavigationStart,
  Router,
  RouterEvent
} from '@angular/router';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { Alert } from './alert';

@Injectable()
export class AlertService implements OnDestroy {
  public alertStream = new Subject();

  private keepAfterNavigationChange = false;
  private ngUnsubscribe = new Subject();

  constructor(
    private router: Router
  ) {
    // Clear alert message on route change?
    this.router.events
      .takeUntil(this.ngUnsubscribe)
      .subscribe((event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          if (this.keepAfterNavigationChange) {
            this.keepAfterNavigationChange = false;
          } else {
            this.alertStream.next();
          }
        }
      });
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public error(message: string, keepAfterNavigationChange?: boolean) {
    this.sendMessage({ text: message, type: 'danger' }, keepAfterNavigationChange);
  }

  public info(message: string, keepAfterNavigationChange?: boolean) {
    this.sendMessage({ text: message, type: 'info' }, keepAfterNavigationChange);
  }

  public success(message: string, keepAfterNavigationChange?: boolean) {
    this.sendMessage({ text: message, type: 'success' }, keepAfterNavigationChange);
  }

  private sendMessage(alert: Alert, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.alertStream.next(alert);
  }
}
