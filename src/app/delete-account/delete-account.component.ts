import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';

import { AuthenticationService, SessionService, UserService, AlertService } from '../_services';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html'
})
export class DeleteAccountComponent {
  public deleteAccountForm: FormGroup;
  public isLoading = false;
  public errors: any;

  constructor(
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private sessionService: SessionService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) {
      this.createForm();
    }

  public deleteAccount(): void {
    this.isLoading = true;
    const formData = this.deleteAccountForm.value;

    this.authenticationService
      .login(this.sessionService.user.emailAddress, formData.password)
      .first()
      .flatMap(() => this.userService.remove(this.sessionService.user._id))
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => {
          this.authenticationService.logout();
          this.alertService.success(data.message, true);
          this.router.navigate(['/login']);
        },
        (err: any) => {
          let message;

          switch (err.code) {
            case 100:
            message = 'Please provide a password.';
            break;
            case 101:
            message = 'The password you entered is invalid.';
            break;
            default:
            message = err.message;
            break;
          }

          this.alertService.error(message);
        }
      );
  }

  private createForm(): void {
    this.deleteAccountForm = this.formBuilder.group({
      password: ''
    });
  }
}
