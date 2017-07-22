import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/subscription';

import { AuthenticationService, SessionService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public currentUser: any;
  private userSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private sessionService: SessionService,
    private router: Router) {
      this.userSubscription = this.sessionService.onUserChanges()
        .subscribe((user: any) => {
          this.currentUser = user;
        });
    }

  public logout(event: MouseEvent): void {
    event.preventDefault();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
