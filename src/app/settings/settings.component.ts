import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/first';

import { UserService, AlertService, SessionService, WindowService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  public settingsForm: FormGroup;
  public isLoading = false;
  public errors: any;
  public user: User;

  public constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userService: UserService,
    private windowService: WindowService,
    private sessionService: SessionService) {
      this.createForm();
    }

  public ngOnInit(): void {
    this.updateForm();
  }

  public submit(): void {
    this.isLoading = true;
    this.userService
      .update(this.settingsForm.value)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (result: any) => {
          this.updateForm();
          this.alertService.success(result.message);
        },
        (error: any) => {
          this.errors = error.errors;
          this.alertService.error(error.message);
        }
      );
  }

  public linkFacebook(): void {
    this.isLoading = true;
    const FB = this.windowService.nativeWindow.FB;
    FB.login((response: any) => {
      if (response.authResponse.userID) {
        this.userService
          .update({
            _id: this.sessionService.user._id,
            facebookId: response.authResponse.userID
          })
          .first()
          .finally(() => this.isLoading = false)
          .subscribe(
            (data: any) => {
              this.updateForm();
              this.alertService.success('Facebook profile successfully linked.');
            },
            (err: any) => {
              this.alertService.error(err.message);
            }
          );
      } else {
        this.alertService.error('Facebook account not linked due to invalid permissions.');
      }
    }, { scope: 'email' });
  }

  public unlinkFacebook(): void {
    this.isLoading = true;
    const changes = {
      _id: this.sessionService.user._id,
      facebookId: null as any
    };
    this.userService
      .update(changes)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (result: any) => {
          this.updateForm();
          this.alertService.success('Facebook profile successfully unlinked.');
        },
        (error: any) => {
          this.alertService.error(error.message);
        }
      );
  }

  public refreshFacebook(): void {
    this.isLoading = true;
    const FB = this.windowService.nativeWindow.FB;
    FB.login((response: any) => {
      if (response.status === 'not_authorized') {
        this.isLoading = false;
        this.alertService.error('Your profile information was not updated because you did not give Facebook permission to do so.');
        return;
      }

      if (response.authResponse.userID) {
        const changes = {
          _id: this.sessionService.user._id,
          facebookUserAccessToken: response.authResponse.accessToken
        };

        this.userService
          .update(changes)
          .first()
          .finally(() => this.isLoading = false)
          .subscribe(
            (data: any) => {
              this.updateForm();
              this.alertService.success(data.message);
            },
            (err: any) => {
              this.alertService.error(err.message);
            }
          );
      } else {
        this.alertService.error('Facebook account not linked due to invalid permissions.');
      }
    }, { scope: 'email' });
  }

  private createForm(): void {
    this.settingsForm = this.formBuilder.group({
      _id: '',
      firstName: '',
      lastName: '',
      emailAddress: ''
    } as User);
  }

  private updateForm(): void {
    this.userService
      .getById(this.sessionService.user._id)
      .first()
      .subscribe((user: User) => {
        this.user = user;
        this.sessionService.setUser(user);
        this.settingsForm.reset(user);
      });
  }
}
