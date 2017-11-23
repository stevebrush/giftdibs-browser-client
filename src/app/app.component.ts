import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AuthenticationService, SessionService, WindowService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public currentUser: any;
  private userSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private sessionService: SessionService,
    private router: Router,
    private windowService: WindowService) { }

  public ngOnInit(): void {
    const FB = this.windowService.nativeWindow.FB;

    FB.init({
      appId: '529193240473948',
      xfbml: false,
      version: 'v2.10'
    });

    this.userSubscription = this.sessionService
      .onUserChanges()
      .subscribe((user: any) => {
        // Allow the page to 'tick' once.
        setTimeout(() => {
          this.currentUser = user;
        }, 0);
      });
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  public logout(event: MouseEvent): void {
    event.preventDefault();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return (this.currentUser !== undefined);
  }
}
