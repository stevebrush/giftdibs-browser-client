import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services';
import { AlertService } from '../_modules/alert';

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
      .finally(() => this.isLoading = false)
      .subscribe(
        () => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        (error: any) => {
          this.alertService.error(error.message);
        });
  }
}
