import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';

import {
  finalize
} from 'rxjs/operators';

import {
  AlertService,
  WindowRefService
} from '@giftdibs/ux';

import {
  AccountService
} from '../../account.service';

import {
  FacebookLoginButtonResult
} from './facebook-login-button-result';

// TODO: Convert this into a directive instead.
@Component({
  selector: 'gd-facebook-login-button',
  templateUrl: './facebook-login-button.component.html',
  styleUrls: ['./facebook-login-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacebookLoginButtonComponent implements OnDestroy {
  @Input()
  public disabled = false;

  @Input()
  public buttonText = 'Continue with Facebook';

  @Output()
  public success = new EventEmitter<FacebookLoginButtonResult>();

  @Output()
  public failure = new EventEmitter<void>();

  public isLoading = false;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private windowService: WindowRefService
  ) { }

  public ngOnDestroy(): void {
    this.success.complete();
    this.failure.complete();
  }

  public login(): void {
    const FB = (this.windowService.nativeWindow as any).FB;
    const facebookConfig = {
      scope: 'email'
    };

    this.isLoading = true;
    this.changeDetector.markForCheck();

    FB.login((response: any) => {
      if (response.status === 'not_authorized') {
        this.isLoading = false;
        this.disabled = false;
        this.changeDetector.detectChanges();
        this.failure.next();
        this.alertService.error(
          'Please provide the necessary permissions to continue with Facebook.'
        );
        return;
      }

      // User cancelled Facebook modal.
      if (!response.authResponse) {
        this.isLoading = false;
        this.disabled = false;
        this.changeDetector.detectChanges();
        this.failure.next();
        return;
      }

      this.accountService.loginUsingFacebook(response.authResponse.accessToken)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.disabled = false;
            this.changeDetector.markForCheck();
          })
        )
        .subscribe(
          (data: any) => {
            this.success.emit({ data });
          },
          (err: any) => {
            this.failure.next();
            // TODO: Facebook failures should be passed through
            // the failure emitter, so that the consumer can handle
            // the error messaging.
            this.alertService.error(err.error.message);
          }
        );
    }, facebookConfig);
  }
}
