import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { SessionService, SessionUser } from '@giftdibs/session';
import { AlertService } from '@giftdibs/ux';

import { combineLatest, Subject } from 'rxjs';
import { filter, finalize, takeUntil } from 'rxjs/operators';
import { AccountService } from 'src/app/features/account/account.service';

@Component({
  selector: 'gd-verify-email-notice',
  templateUrl: './verify-email-notice.component.html',
  styleUrls: ['./verify-email-notice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AccountService],
})
export class VerifyEmailNoticeComponent implements OnInit, OnDestroy {
  @Input()
  public visibleForRoutes: string[] = [];

  public isActive = false;
  public isLoading = false;

  private sessionUser: SessionUser;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private sessionService: SessionService,
  ) {}

  public ngOnInit(): void {
    combineLatest(
      this.sessionService.userStream,
      this.router.events.pipe(
        filter((event) => event instanceof NavigationStart),
      ),
    )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value: [SessionUser, RouterEvent]) => {
        this.sessionUser = value[0];
        const event: RouterEvent = value[1];

        if (this.visibleForRoutes.indexOf(event.url) > -1) {
          this.isActive =
            this.sessionService.isLoggedIn &&
            this.sessionUser &&
            !this.sessionUser.emailAddressVerified;
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

  public sendVerificationEmail(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    this.accountService
      .resendEmailAddressVerification(this.sessionUser.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.changeDetector.markForCheck();
        }),
      )
      .subscribe(
        (data: any) => {
          this.alertService.success(data.message);
        },
        (err: any) => {
          this.alertService.error(err.error.message);
        },
      );
  }
}
