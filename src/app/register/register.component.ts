import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      .finally(() => this.isLoading = false)
      .subscribe(
        () => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        (error: any) => {
          if (error.code === 108) {
            this.router.navigate(['/404']);
            return;
          }

          this.errors = error;
          this.alertService.error(error.message);
        });
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
