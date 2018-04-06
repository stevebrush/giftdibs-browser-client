import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { AccountService } from '../account.service';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'gd-forgotten',
  templateUrl: './forgotten.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgottenComponent {
  public forgottenForm: FormGroup;
  public errors: any[] = [];

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  public submit(): void {
    if (this.forgottenForm.disabled) {
      return;
    }

    this.forgottenForm.disable();
    this.errors = [];

    const formData = this.forgottenForm.value;
    this.accountService
      .forgotten(formData.emailAddress)
      .subscribe(
        (result: any) => {
          this.alertService.success(result.message);
          this.forgottenForm.reset();
          this.forgottenForm.enable();
          this.changeDetector.markForCheck();
        },
        (err: any) => {
          this.errors = err.error.errors;
          this.alertService.error(err.error.message);
          this.forgottenForm.enable();
          this.changeDetector.markForCheck();
        }
      );
  }

  private createForm(): void {
    this.forgottenForm = this.formBuilder.group({
      emailAddress: new FormControl(null, [
        Validators.required
      ])
    });
  }
}
