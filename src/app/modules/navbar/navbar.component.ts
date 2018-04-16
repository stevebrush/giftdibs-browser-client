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

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AlertService } from '../alert/alert.service';
import { SessionService } from '../session/session.service';
import { SessionUser } from '../session/session-user';

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

  private ngUnsubscribe = new Subject();

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private sessionService: SessionService
  ) { }

  public ngOnInit() {
    this.sessionService.userStream
      .takeUntil(this.ngUnsubscribe)
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

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public logout() {
    this.sessionService.clearAll();
    this.alertService.info('You have been successfully logged out.', true);
    this.router.navigate(['/account', 'login']);
  }

  public isLoggedIn(): boolean {
    return this.sessionService.isLoggedIn;
  }
}
