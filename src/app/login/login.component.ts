import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../_services';
import { AlertService } from '../_modules/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public isLoading = false;
  public model: any = {};
  private redirectUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService) {}

  public ngOnInit() {
    this.authenticationService.logout();
    this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/';
  }

  public login() {
    this.isLoading = true;
    this.authenticationService
      .login(this.model.emailAddress, this.model.password)
      .subscribe(
        () => {
          this.router.navigate([this.redirectUrl]);
          window.location.reload();
        },
        (error: any) => {
          this.alertService.error(error.message);
          this.isLoading = false;
        });
  }
}
