import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-forgotten',
  templateUrl: './forgotten.component.html'
})
export class ForgottenComponent implements OnInit {
  public forgottenForm: FormGroup;
  public isLoading = false;
  public errors: any;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authenticationService: AuthenticationService) {
      this.createForm();
    }

  public ngOnInit() {
    this.authenticationService.logout();
  }

  public requestLink() {
    this.isLoading = true;
    const data = this.forgottenForm.value;
    this.authenticationService
      .forgotten(data.emailAddress)
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
