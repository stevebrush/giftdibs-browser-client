import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../_services';
import { AlertService } from '../_modules/alert';

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
    private userService: UserService) {
      this.createForm();
    }

  public ngOnInit(): void {
    const session = JSON.parse(localStorage.getItem('currentUser'));
    this.userService
      .getById(session.user._id)
      .subscribe((user: any) => {
        this.settingsForm.reset(user);
      });
  }

  public submit(): void {
    this.isLoading = true;
    this.userService
      .update(this.settingsForm.value)
      .finally(() => this.isLoading = false)
      .subscribe(
        (result: any) => {
          const session = JSON.parse(localStorage.getItem('currentUser'));
          session.user = this.settingsForm.value;
          localStorage.setItem('currentUser', JSON.stringify(session));
          this.alertService.success(result.message);
        },
        (error: any) => {
          error.errors.forEach((err: any, i: number) => {
            if (this.settingsForm.controls[err.field]) {
              this.settingsForm.controls[err.field].setErrors({
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
    });
  }
}
