import {
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

import { AuthenticationService } from './authentication.service';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'gd-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errors: any[] = [];
  public redirectUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
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

    const formData = this.loginForm.value;
    this.loginForm.disable();
    this.authenticationService
      .login(formData.emailAddress, formData.password)
      .subscribe(
        (result: any) => {
          alert(result.message);
          this.router.navigate([this.redirectUrl]);
        },
        (err: any) => {
          this.errors = err.error.errors;
          alert(err.error.message);
          this.loginForm.enable();
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
