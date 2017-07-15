import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AlertService } from '../_modules/alert';

import { UserService, SessionService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  public settingsForm: FormGroup;
  public isLoading = false;

  public constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userService: UserService,
    private sessionService: SessionService) {
      this.createForm();
    }

  public ngOnInit(): void {
    this.userService
      .getById(this.sessionService.user._id)
      .subscribe((data: any) => {
        this.settingsForm.reset(data);
      });
  }

  public submit(): void {
    this.isLoading = true;
    this.userService
      .update(this.settingsForm.value)
      .finally(() => this.isLoading = false)
      .subscribe(
        (result: any) => {
          this.sessionService.user = this.settingsForm.value;
          this.alertService.success(result.message);
        },
        (error: any) => {
          error.errors.forEach((err: any, i: number) => {
            const control = this.settingsForm.controls[err.field];
            if (control) {
              control.setErrors({
                [`schemaError.${i}`]: err.message
              });
            }
          });

          this.alertService.error(error.message);
        }
      );
  }

  private createForm(): void {
    this.settingsForm = this.formBuilder.group({
      _id: '',
      firstName: '',
      lastName: '',
      emailAddress: ''
    } as User);
  }
}
