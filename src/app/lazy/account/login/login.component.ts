import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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

import { AccountService } from '../account.service';
import { SessionService } from '../../../modules/session/session.service';
import { AlertService } from '../../../modules/alert/alert.service';

@Component({
  selector: 'gd-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errors: any[] = [];
  public redirectUrl: string;

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

  public ngOnInit() {
    this.sessionService.clearAll();
    this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/';
  }

  public submit(): void {
    if (this.loginForm.disabled) {
      return;
    }

    this.loginForm.disable();
    this.errors = [];

    const formData = this.loginForm.value;
    this.accountService
      .login(formData.emailAddress, formData.password)
      .subscribe(
        (result: any) => {
          this.alertService.success(result.message, true);

          let redirect;
          if (this.redirectUrl === '/') {
            redirect = ['/'];
          } else {
            redirect = this.redirectUrl.split('/');
          }

          this.router.navigate(redirect);
        },
        (err: any) => {
          this.errors = err.error.errors;
          this.alertService.error(err.error.message);
          this.loginForm.enable();
          this.changeDetector.markForCheck();
        }
      );
  }

  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      emailAddress: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }
}
