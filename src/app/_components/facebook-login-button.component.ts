import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/first';

import { GDAlertService } from '../_modules';

import { AuthenticationService, WindowService } from '../_services';

@Component({
  selector: 'gd-facebook-login-button',
  templateUrl: './facebook-login-button.component.html',
  styleUrls: ['./facebook-login-button.component.scss']
})
export class FacebookLoginButtonComponent {
  @Input()
  public disabled = false;

  @Input()
  public redirectUrl = '/';

  public isLoading = false;

  constructor(
    private alertService: GDAlertService,
    private authenticationService: AuthenticationService,
    private windowService: WindowService,
    private router: Router
  ) { }

  public login(): void {
    const FB = this.windowService.nativeWindow.FB;

    this.isLoading = true;

    FB.login((response: any) => {
      if (response.status === 'not_authorized') {
        this.isLoading = false;
        this.alertService.error(
          'Please provide the necessary permissions to continue with Facebook.'
        );
        return;
      }

      this.authenticationService
        .loginUsingFacebook(response.authResponse.accessToken)
        .first()
        .finally(() => this.isLoading = false)
        .subscribe(
          (data: any) => {
            this.alertService.success(data.message, true);
            this.router.navigate([this.redirectUrl]);
          },
          (err: any) => {
            // Facebook registration request.
            if (err.error.code === 111) {
              const data = JSON.parse(err.error.message);
              this.router.navigate(['/register-facebook', data.accessToken]);
              return;
            }

            this.alertService.error(err.error.message);
          }
        );
    }, { scope: 'email' });
  }
}
