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
} from '@app/ui';

import {
  AccountService
} from '../../account.service';

import {
  FacebookLoginButtonResult
} from './facebook-login-button-result';

@Component({
  selector: 'gd-facebook-login-button',
  templateUrl: './facebook-login-button.component.html',
  styleUrls: ['./facebook-login-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacebookLoginButtonComponent implements OnDestroy {
  @Input()
  public disabled = false;

  @Output()
  public success = new EventEmitter<FacebookLoginButtonResult>();

  public isLoading = false;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private windowService: WindowRefService
  ) { }

  public ngOnDestroy(): void {
    this.success.complete();
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
        this.changeDetector.markForCheck();
        this.alertService.error(
          'Please provide the necessary permissions to continue with Facebook.'
        );
        return;
      }

      this.accountService.loginUsingFacebook(response.authResponse.accessToken)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.changeDetector.markForCheck();
          })
        )
        .subscribe(
          (data: any) => {
            this.success.emit({ data });
          },
          (err: any) => {
            this.alertService.error(err.error.message);
          }
        );
    }, facebookConfig);
  }
}
