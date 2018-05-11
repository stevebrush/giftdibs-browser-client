import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  Subject
} from 'rxjs';

import {
  takeUntil
} from 'rxjs/operators';

import {
  AlertService
} from '../../../modules/alert';

import {
  SessionService
} from '../../../modules/session';

import { AccountService } from '../account.service';

@Component({
  selector: 'gd-reset-password',
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public resetPasswordForm: FormGroup;
  public errors: any[] = [];
  public hasToken = false;

  private ngUnsubscribe = new Subject();

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.createForm();
  }

  public ngOnInit(): void {
    this.resetPasswordForm.disable();

    this.route.params.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((params: any) => {
      if (!params.resetPasswordToken) {

        // If the user is logged in, they should be able to access the form.
        if (this.sessionService.isLoggedIn) {
          this.resetPasswordForm.enable();
          return;
        }

        this.alertService.error('A reset password token was not provided.', true);
        this.router.navigate(['/account/forgotten']);
        return;
      }

      this.resetPasswordForm.controls.resetPasswordToken.setValue(params.resetPasswordToken);
      this.resetPasswordForm.enable();
      this.hasToken = true;
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public submit(): void {
    if (this.resetPasswordForm.disabled) {
      return;
    }

    this.resetPasswordForm.disable();
    this.errors = [];

    const formData = this.resetPasswordForm.value;
    this.accountService
      .resetPassword(formData)
      .subscribe(
        (result: any) => {
          if (this.hasToken) {
            this.alertService.success(result.message, true);
            this.router.navigate(['/account', 'login']);
          } else {
            this.alertService.success(result.message);
            this.resetPasswordForm.reset();
            this.resetPasswordForm.enable();
            this.changeDetector.markForCheck();
          }
        },
        (err: any) => {
          this.errors = err.error.errors;
          this.alertService.error(err.error.message);
          this.resetPasswordForm.enable();
          this.changeDetector.markForCheck();
        }
      );
  }

  private createForm(): void {
    this.resetPasswordForm = this.formBuilder.group({
      currentPassword: new FormControl(undefined, [
        Validators.required
      ]),
      password: new FormControl(undefined, [
        Validators.required
      ]),
      passwordAgain: new FormControl(undefined, [
        Validators.required
      ]),
      resetPasswordToken: new FormControl(undefined, [])
    });
  }
}
