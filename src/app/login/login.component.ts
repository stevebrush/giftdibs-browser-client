import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/first';

import { AlertService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isLoading = false;
  public errors: any;
  public redirectUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authenticationService: AuthenticationService) {
      this.createForm();
    }

  public ngOnInit() {
    this.authenticationService.logout();
    this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/';
  }

  public login() {
    this.isLoading = true;
    const formData = this.loginForm.value;
    this.authenticationService
      .login(formData.emailAddress, formData.password)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => {
          this.alertService.success(data.message, true);
          this.router.navigate([this.redirectUrl]);
        },
        (error: any) => {
          this.errors = error;
          this.alertService.error(error.message);
        }
      );
  }

  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      emailAddress: '',
      password: ''
    });
  }
}
