import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  SessionService,
  SessionUser
} from '@giftdibs/session';

import {
  DropdownMenuItem,
  MediaQueryBreakpoint,
  MediaQueryService
} from '@giftdibs/ux';

import {
  Subject
} from 'rxjs';

import {
  takeUntil
} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {
  public sessionUser: SessionUser;
  public isLoggedIn = false;
  public isMobile = false;
  public showSearch = false;
  public routes: {
    path: string[];
    name: string;
  }[];

  public menuItems: DropdownMenuItem[] = [
    {
      label: 'Settings',
      route: '/account/settings',
      addSeparatorAfter: true
    },
    {
      label: 'Help',
      route: '/support'
    },
    {
      label: 'Report a problem',
      route: '/support/feedback',
      addSeparatorAfter: true
    },
    {
      label: 'Log out',
      action: () => {
        this.logout();
      }
    }
  ];

  public menuItemsMobile: DropdownMenuItem[] = [];

  private ngUnsubscribe = new Subject();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private mediaQueryService: MediaQueryService,
    private router: Router,
    private sessionService: SessionService
  ) { }

  public ngOnInit(): void {
    this.sessionService.userStream
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((sessionUser: SessionUser) => {
        if (sessionUser) {
          this.sessionUser = sessionUser;
          this.isLoggedIn = this.sessionService.isLoggedIn;

          this.menuItemsMobile = [
            {
              label: 'Profile',
              route: `/users/${sessionUser.id}`
            },
            {
              label: 'Dibs',
              route: '/dibs',
              addSeparatorAfter: true
            }
          ];

          // Add the default menu items to the mobile menu:
          this.menuItems.forEach((menuItem) => {
            this.menuItemsMobile.push(menuItem);
          });

          this.changeDetector.markForCheck();
        }
      });

    this.mediaQueryService.breakpointChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((breakpoint: MediaQueryBreakpoint) => {
        this.isMobile = (
          breakpoint === MediaQueryBreakpoint.XXSmall ||
          breakpoint === MediaQueryBreakpoint.XSmall
        );
        this.changeDetector.markForCheck();
      });

    this.routes = [
      {
        name: 'GiftDibs',
        path: ['/']
      }
    ];
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private logout(): void {
    this.sessionService.clearAll();
    this.isLoggedIn = false;
    this.changeDetector.detectChanges();
    this.router.navigate(['/account', 'login']);
  }
}
