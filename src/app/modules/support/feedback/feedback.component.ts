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

@Component({
  selector: 'gd-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackComponent {
  public feedbackForm: FormGroup;
  public errors: any[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  public submit(): void {
    if (this.feedbackForm.disabled) {
      return;
    }

    const formData = this.feedbackForm.value;
    console.log('Form data:', formData);

    // this.feedbackForm.disable();
    // this.errors = [];
    this.changeDetector.markForCheck();

    // this.accountService.register(this.feedbackForm.value)
    //   .subscribe(
    //     () => {
    //       this.router.navigate(['/account', 'login']);
    //     },
    //     (err: any) => {
    //       const error = err.error;

    //       // Spam control
    //       if (error.code === 108) {
    //         this.router.navigate(['/page-not-found']);
    //         return;
    //       }

    //       this.alertService.error(error.message);
    //       this.errors = error.errors;
    //       this.feedbackForm.enable();
    //       this.changeDetector.markForCheck();
    //     }
    //   );
  }

  private createForm(): void {
    this.feedbackForm = this.formBuilder.group({
      reason: new FormControl('general'),
      referrer: new FormControl(document.referrer),
      gdNickname: null,
      message: new FormControl(null, [
        Validators.required
      ])
    });
  }
}
