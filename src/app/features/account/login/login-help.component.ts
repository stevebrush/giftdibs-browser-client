import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, ModalInstance } from '@giftdibs/ux';

import { finalize } from 'rxjs/operators';

import { AccountService } from '../account.service';

import { LoginHelpContext } from './login-help-context';

@Component({
  selector: 'gd-login-help',
  templateUrl: './login-help.component.html',
  styleUrls: ['./login-help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginHelpComponent {
  public forgottenForm: UntypedFormGroup;
  public errors: any[] = [];

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private context: LoginHelpContext,
    private formBuilder: UntypedFormBuilder,
    private modal: ModalInstance<any>,
    private router: Router,
  ) {
    this.createForm();
  }

  public onFacebookLoginSuccess(): void {
    this.router.navigate(['/']);
  }

  public onCancelClicked(): void {
    this.modal.close('cancel');
  }

  public submit(): void {
    if (this.forgottenForm.disabled) {
      return;
    }

    this.forgottenForm.disable();
    this.errors = [];
    this.changeDetector.markForCheck();

    const formData = this.forgottenForm.value;
    this.accountService
      .forgotten(formData.emailAddress)
      .pipe(
        finalize(() => {
          this.forgottenForm.enable();
          this.changeDetector.markForCheck();
        }),
      )
      .subscribe(
        (result: any) => {
          this.alertService.success(result.message);
          this.forgottenForm.reset();
        },
        (err: any) => {
          this.errors = err.error.errors;
          this.alertService.error(err.error.message);
        },
      );
  }

  private createForm(): void {
    this.forgottenForm = this.formBuilder.group({
      emailAddress: new UntypedFormControl(this.context.emailAddress, [
        Validators.required,
      ]),
    });
  }
}
