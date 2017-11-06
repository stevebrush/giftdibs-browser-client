import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/first';
import { Subscription } from 'rxjs/Subscription';

import { AlertService, AuthenticationService, SessionService } from '../_services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public resetPasswordForm: FormGroup;
  public isLoading = true;
  public errors: any;
  public hasToken = false;

  private paramSubscription: Subscription;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) {
      this.createForm();
    }

  public ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params: any) => {
      if (!params.resetPasswordToken) {

        // If the user is logged in, they should be able to access the form.
        if (this.sessionService.user) {
          this.isLoading = false;
          return;
        }

        this.alertService.error('A reset password token was not provided.', true);
        this.router.navigate(['/login']);
        return;
      }

      this.resetPasswordForm.controls.resetPasswordToken.setValue(params.resetPasswordToken);
      this.isLoading = false;
      this.hasToken = true;
    });
  }

  public ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

  public resetPassword(): void {
    this.isLoading = true;
    this.authenticationService
      .resetPassword(this.resetPasswordForm.value)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (result: any) => {
          this.alertService.success(result.message, true);
          this.resetPasswordForm.reset();
          if (this.sessionService.user) {
            this.router.navigate(['/settings']);
          } else {
            this.router.navigate(['/login']);
          }
        },
        (err: any) => {
          this.errors = err.error.errors;
          this.alertService.error(err.error.message);
        }
      );
  }

  private createForm(): void {
    this.resetPasswordForm = this.formBuilder.group({
      currentPassword: undefined,
      password: '',
      passwordAgain: '',
      resetPasswordToken: ''
    });
  }
}
