import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/first';

import { AlertService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public isLoading = false;
  public errors: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authenticationService: AuthenticationService) {
      this.createForm();
    }

  public register(): void {
    this.isLoading = true;
    this.authenticationService.register(this.registerForm.value)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (result: any) => {
          this.alertService.success(result.message, true);
          this.router.navigate(['/login']);
        },
        (error: any) => {
          if (error.code === 108) {
            this.router.navigate(['/404']);
            return;
          }

          this.errors = error.errors;
          this.alertService.error(error.message);
        }
      );
  }

  private createForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      gdNickname: '',
      emailAddress: '',
      password: ''
    });
  }
}
