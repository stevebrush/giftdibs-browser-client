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
import { AlertService } from '@giftdibs/ux';

import { finalize } from 'rxjs/operators';

import { AccountService } from '../account.service';

@Component({
  selector: 'gd-forgotten',
  templateUrl: './forgotten.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgottenComponent {
  public isLoading = false;
  public forgottenForm: UntypedFormGroup;
  public errors: any[] = [];

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: UntypedFormBuilder,
  ) {
    this.createForm();
  }

  public submit(): void {
    if (this.forgottenForm.disabled) {
      return;
    }

    this.isLoading = true;
    this.forgottenForm.disable();
    this.errors = [];
    this.changeDetector.markForCheck();

    const formData = this.forgottenForm.value;
    this.accountService
      .forgotten(formData.emailAddress)
      .pipe(
        finalize(() => {
          this.forgottenForm.enable();
          this.isLoading = false;
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
      emailAddress: new UntypedFormControl(null, [Validators.required]),
    });
  }
}
