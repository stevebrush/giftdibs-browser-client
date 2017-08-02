import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/first';

import { AlertService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-forgotten',
  templateUrl: './forgotten.component.html'
})
export class ForgottenComponent {
  public forgottenForm: FormGroup;
  public isLoading = false;
  public errors: any;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authenticationService: AuthenticationService) {
      this.createForm();
    }

  public requestLink() {
    this.isLoading = true;
    const data = this.forgottenForm.value;
    this.authenticationService
      .forgotten(data.emailAddress)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (result: any) => {
          this.alertService.success(result.message);
          this.forgottenForm.reset();
        },
        (error: any) => {
          this.errors = error;
          this.alertService.error(error.message);
        });
  }

  private createForm(): void {
    this.forgottenForm = this.formBuilder.group({
      emailAddress: ''
    });
  }
}
