import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  SessionService,
  SessionUser
} from '@giftdibs/session';

import {
  DropdownMenuItem
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

  @ViewChild('button')
  public buttonRef: ElementRef;

  public isLoading = true;

  private ngUnsubscribe = new Subject();

  constructor(
    private changeDetector: ChangeDetectorRef,
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

          this.isLoading = false;
          this.changeDetector.markForCheck();
        }
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

  public isLoggedIn(): boolean {
    return this.sessionService.isLoggedIn;
  }

  private logout(): void {
    this.sessionService.clearAll();
    this.router.navigate(['/account', 'login']);
  }
}
