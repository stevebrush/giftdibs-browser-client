import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService, AlertService, SessionService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  public settingsForm: FormGroup;
  public isLoading = false;
  public errors: any;

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
      .subscribe((user: User) => {
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
          this.userService
            .getById(this.sessionService.user._id)
            .subscribe((user: User) => {
              this.sessionService.setUser(user);
              this.alertService.success(result.message);
            });
        },
        (error: any) => {
          this.errors = error;
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
