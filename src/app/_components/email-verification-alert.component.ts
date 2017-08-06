import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/subscription';
import 'rxjs/add/operator/first';

import { AlertService, AuthenticationService, SessionService } from '../_services';

@Component({
  selector: 'app-email-verification-alert',
  templateUrl: './email-verification-alert.component.html',
  styleUrls: ['./email-verification-alert.component.scss']
})
export class EmailVerificationAlertComponent implements OnDestroy {
  public currentUser: any;
  public isLoading = false;

  private userSubscription: Subscription;

  constructor(
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private sessionService: SessionService) {
      this.userSubscription = this.sessionService.onUserChanges()
        .subscribe((user: any) => {
          this.currentUser = user;
        });
    }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  public sendVerificationEmail(): void {
    this.isLoading = true;
    this.authenticationService
      .resendEmailAddressVerification(this.currentUser._id)
      .first()
      .finally(() => this.isLoading = false)
      .subscribe(
        (data: any) => {
          this.sessionService.modifyUser({
            emailAddressVerified: true
          });
          this.alertService.success(data.message);
        },
        (err: any) => {
          this.alertService.error(err.message);
        }
      );
  }
}
