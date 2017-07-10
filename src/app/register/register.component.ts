import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  public model: any = {};
  public isLoading = false;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService) { }

  public register(): void {
    this.isLoading = true;
    this.authenticationService.register(this.model)
      .subscribe(
        () => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          const result = error.json();
          console.log(result, error);
          let message;

          if (error.status === 401) {
            message = 'The email address and password you entered were not found in our records.';
          }

          if (error.status === 400) {
            message = result.message;
          }

          this.alertService.error(message);
          this.isLoading = false;
        });
  }
}
