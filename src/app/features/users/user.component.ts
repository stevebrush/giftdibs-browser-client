import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';

import { AlertService } from '../../modules/alert/alert.service';

import { User } from './user';
import { UserService } from './user.service';
import { SessionService } from '../../modules/session/session.service';

@Component({
  selector: 'gd-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit, OnDestroy {
  public isLoading = true;
  public isSessionUser = false;
  public user: User;

  private ngUnsubscribe = new Subject();

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private userService: UserService
  ) { }

  public ngOnInit() {
    this.route.params
      .mergeMap((params: Params) => {
        this.isLoading = true;
        this.user = undefined;
        this.isSessionUser = false;
        this.changeDetector.markForCheck();
        return this.userService.getById(params.userId);
      })
      .takeUntil(this.ngUnsubscribe)
      .subscribe((user: User) => {
        this.user = user;
        this.isSessionUser = this.sessionService.isSessionUser(this.user._id);
        this.isLoading = false;
        this.changeDetector.markForCheck();
      }, () => {
        this.alertService.error('User not found.', true);
        this.router.navigate(['/users']);
      });
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
