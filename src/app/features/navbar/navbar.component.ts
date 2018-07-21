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
  Subject
} from 'rxjs';

import {
  takeUntil
} from 'rxjs/operators';

import {
  DropdownMenuItem
} from '../../modules/dropdown-menu';

import {
  SessionService,
  SessionUser
} from '../account/session';

@Component({
  selector: 'gd-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {
  public sessionUser: SessionUser;
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
      label: 'Log out',
      action: () => {
        this.logout();
      }
    }
  ];

  @ViewChild('button')
  public buttonRef: ElementRef;

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
        this.sessionUser = sessionUser;
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

  public isLoggedIn(): boolean {
    return this.sessionService.isLoggedIn;
  }

  private logout(): void {
    this.sessionService.clearAll();
    this.router.navigate(['/account', 'login']);
  }
}
