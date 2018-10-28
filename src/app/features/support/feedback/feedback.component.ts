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

import {
  Router
} from '@angular/router';

import {
  AlertService
} from '@giftdibs/ux';

import {
  finalize
} from 'rxjs/operators';

import { FeedbackReason } from './feedback-reason';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'gd-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackComponent {
  public feedbackForm: FormGroup;
  public errors: any[] = [];
  public isLoading = false;

  public reasons: {name: string; value: FeedbackReason}[] = [
    {
      name: 'General inquiry',
      value: FeedbackReason.GeneralInquiry
    },
    {
      name: 'Problem with my account',
      value: FeedbackReason.ProblemWithAccount
    },
    {
      name: 'Problem with site',
      value: FeedbackReason.Bug
    },
    {
      name: 'Report abuse or spam',
      value: FeedbackReason.Abuse
    }
  ];

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private feedbackService: FeedbackService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  public submit(): void {
    if (this.feedbackForm.disabled) {
      return;
    }

    this.isLoading = true;
    this.feedbackForm.disable();
    this.errors = [];
    this.changeDetector.markForCheck();

    const formData = this.feedbackForm.value;

    this.feedbackService.create(formData)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe(
        (result: any) => {
          this.feedbackForm.enable();
          this.feedbackForm.reset();
          this.changeDetector.markForCheck();
          this.alertService.success(result.message);
        },
        (err: any) => {
          const error = err.error;

          // Spam control
          if (error.code === 108) {
            this.router.navigate(['/page-not-found']);
            return;
          }

          this.alertService.error(error.message);
          this.errors = error.errors;
          this.feedbackForm.enable();
          this.changeDetector.markForCheck();
        }
      );
  }

  private createForm(): void {
    this.feedbackForm = this.formBuilder.group({
      reason: new FormControl(FeedbackReason.GeneralInquiry),
      referrer: new FormControl(document.referrer),
      gdNickname: null,
      message: new FormControl(null, [
        Validators.required
      ])
    });
  }
}
