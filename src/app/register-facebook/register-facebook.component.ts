import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/first';
import { Subscription } from 'rxjs/Subscription';

import { AlertService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-register-facebook',
  templateUrl: './register-facebook.component.html'
})
export class RegisterFacebookComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  public isLoading = true;
  public errors: any;

  private routeSubscription: Subscription;
  private accessToken: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) {
      this.createForm();
    }

  public ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params: any) => {
      this.accessToken = params.accessToken;
      this.isLoading = false;
    });
  }

  public ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  public register(): void {
    this.isLoading = true;

    this.authenticationService
      .registerWithFacebook(this.registerForm.value.password, this.accessToken)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (result: any) => {
          this.alertService.success(result.message, true);
          this.router.navigate(['/']);
        },
        (error: any) => {
          this.errors = error;
          this.alertService.error(error.message);
        }
      );
  }

  private createForm(): void {
    this.registerForm = this.formBuilder.group({
      password: ''
    });
  }
}
