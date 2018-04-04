import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import {
  Router
} from '@angular/router';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
// import { Subscription } from 'rxjs/Subscription';

// import {
//   AuthenticationService,
//   SessionService,
//   WindowService
// } from '../../_services';

import { SessionService } from '../session/session.service';
import { SessionUser } from '../session/session-user';

@Component({
  selector: 'gd-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {
  public currentUser: SessionUser;
  // public routes: any[];
  // private userSubscription: Subscription;

  private ngUnsubscribe = new Subject();

  constructor(
    // private authenticationService: AuthenticationService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private sessionService: SessionService
    // private windowService: WindowService
  ) { }

  public ngOnInit(): void {
    this.sessionService.userStream
      .takeUntil(this.ngUnsubscribe)
      .subscribe((sessionUser: SessionUser) => {
        this.currentUser = sessionUser;
        this.changeDetector.markForCheck();
      });
    // const FB = this.windowService.nativeWindow.FB;

    // FB.init({
    //   appId: '529193240473948',
    //   xfbml: false,
    //   version: 'v2.10'
    // });

    // this.userSubscription = this.sessionService
    //   .onUserChanges()
    //   .subscribe((user: any) => {
    //     // Allow the page to 'tick' once.
    //     setTimeout(() => {
    //       this.currentUser = user;

    //       this.routes = [
    //         {
    //           name: 'GiftDibs',
    //           path: ['/']
    //         },
    //         {
    //           name: 'Users',
    //           path: ['/users']
    //         },
    //         {
    //           name: 'Wish lists',
    //           path: ['/wish-lists']
    //         },
    //         {
    //           name: 'Support',
    //           path: ['/support']
    //         }
    //       ];
    //     }, 0);
    //   });
  }

  public ngOnDestroy(): void {
    // this.userSubscription.unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public logout(): void {
    this.sessionService.clearAll();
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return (this.currentUser !== undefined);
  }
}
