import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  NavigationStart,
  Router,
  RouterEvent
} from '@angular/router';

import {
  combineLatest,
  Subject
} from 'rxjs';

import {
  filter,
  takeUntil
} from 'rxjs/operators';

import {
  SessionService,
  SessionUser
} from '../../features/account/session';

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
    combineLatest(
      this.sessionService.userStream,
      this.router.events.pipe(
        filter(event => event instanceof NavigationStart)
      )
    ).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((value: [SessionUser, RouterEvent]) => {
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
