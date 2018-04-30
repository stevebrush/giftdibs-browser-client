import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import {
  NavigationStart,
  Router,
  RouterEvent
} from '@angular/router';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';

import {
  SessionService,
  SessionUser
} from '../../modules/session';

@Component({
  selector: 'gd-verify-email-notice',
  templateUrl: './verify-email-notice.component.html',
  styleUrls: ['./verify-email-notice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyEmailNoticeComponent implements OnInit, OnDestroy {
  @Input()
  public visibleForRoutes: string[] = [];

  public isActive = false;

  private ngUnsubscribe = new Subject();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private sessionService: SessionService
  ) { }

  public ngOnInit(): void {
    this.sessionService.userStream
      .combineLatest(this.router.events.filter(event => event instanceof NavigationStart))
      .takeUntil(this.ngUnsubscribe)
      .subscribe((value: [SessionUser, RouterEvent]) => {
        const sessionUser: SessionUser = value[0];
        const event: RouterEvent = value[1];

        if (this.visibleForRoutes.includes(event.url)) {
          this.isActive = (this.sessionService.isLoggedIn && (sessionUser && !sessionUser.emailAddressVerified));
        } else {
          this.isActive = false;
        }

        this.changeDetector.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
