import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  AlertService
} from '@app/ui';

import {
  AccountService
} from '../account.service';

@Component({
  selector: 'gd-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public errors: any[] = [];

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  public onFacebookLoginSuccess(): void {
    // TODO: Redirect to profile instead?
    this.router.navigate(['/']);
  }

  public submit(): void {
    if (this.registerForm.disabled) {
      return;
    }

    this.registerForm.disable();
    this.errors = [];
    this.changeDetector.markForCheck();

    this.accountService.register(this.registerForm.value)
      .subscribe(
        () => {
          this.router.navigate(['/account', 'login']);
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
          this.registerForm.enable();
          this.changeDetector.markForCheck();
        }
      );
  }

  private createForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl(null, [
        Validators.required
      ]),
      lastName: new FormControl(null, [
        Validators.required
      ]),
      gdNickname: null,
      emailAddress: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required
      ]),
      birthday: new FormControl(null, [
        Validators.required
      ])
    });
  }
}
