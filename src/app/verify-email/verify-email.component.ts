import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { User } from '../_models';
import { AlertService, AuthenticationService, SessionService } from '../_services';

@Component({
  selector: 'app-verify-email',
  template: ''
})
export class VerifyEmailComponent implements OnDestroy {
  public paramSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private sessionService: SessionService,
    private authenticationService: AuthenticationService) {
    this.paramSubscription = this.route.params.subscribe((params: any) => {
      this.authenticationService
        .verifyEmailAddress(params.emailAddressVerificationToken)
        .subscribe(
          (data: any) => {
            this.sessionService.modifyUser({
              emailAddressVerified: true
            });
            this.alertService.success(data.message, true);
            this.router.navigate(['/']);
          },
          (err: any) => {
            this.alertService.error(err.message, true);
            this.router.navigate(['/']);
          }
        );
    });
  }

  public ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
