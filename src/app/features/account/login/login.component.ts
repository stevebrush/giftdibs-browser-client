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

import {
  AlertService, ModalService
} from '@giftdibs/ux';

import {
  SessionService
} from '@giftdibs/session';

import {
  AccountService
} from '../account.service';

import {
  LoginHelpComponent
} from './login-help.component';

import {
  LoginHelpContext
} from './login-help-context';

@Component({
  selector: 'gd-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errors: any[] = [];
  public redirectUrl: string;
  public isLoading = false;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.createForm();
  }

  public ngOnInit(): void {
    this.sessionService.clearAll();
    this.redirectUrl = decodeURIComponent(this.route.snapshot.queryParams['redirectUrl'] || '/');
  }

  public submit(): void {
    if (this.loginForm.disabled) {
      return;
    }

    this.isLoading = true;
    this.loginForm.disable();
    this.errors = [];
    this.changeDetector.markForCheck();

    const formData = this.loginForm.value;
    this.accountService.login(formData.emailAddress, formData.password)
      .subscribe(
        () => {
          this.redirect();
        },
        (err: any) => {
          this.errors = err.error.errors;

          if (err.error.code === 112) {
            this.openLoginHelpModal(formData.emailAddress);
          } else {
            this.alertService.error(err.error.message);
          }

          this.loginForm.enable();
          this.isLoading = false;
          this.changeDetector.markForCheck();
        }
      );
  }

  public onFacebookLoginSuccess(): void {
    this.redirect();
  }

  public onFacebookLoginFailure(): void {
    this.loginForm.enable();
    this.isLoading = false;
    this.changeDetector.detectChanges();
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

  private redirect(): void {
    const urlParts = this.redirectUrl.split('?');
    const routeParts = urlParts[0] === '/' ? ['/'] : urlParts[0].split('/');

    let params: string[];
    if (urlParts.length > 1) {
      params = urlParts[1].split('&');
    }

    const queryParams: {[_: string]: string} = {};
    if (params && params.length > 0) {
      params.forEach((param) => {
        const paramParts = param.split('=');
        queryParams[paramParts[0]] = paramParts[1];
      });
    }

    this.router.navigate(routeParts, {
      queryParams
    });
  }

  private openLoginHelpModal(emailAddress: string): void {
    this.modalService.open(LoginHelpComponent, {
      providers: [{
        provide: LoginHelpContext,
        useValue: {
          emailAddress
        }
      }]
    });
  }
}
