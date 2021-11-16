import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FriendshipService,
  FriendshipSummary,
} from '@app/shared/modules/friendship';
import { User, UserService } from '@app/shared/modules/user';
import { SessionService } from '@giftdibs/session';
import { AlertService } from '@giftdibs/ux';

import { Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'gd-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendListComponent implements OnInit, OnDestroy {
  @Input()
  public type: 'followers' | 'following';

  public friends: User[];
  public isLoading = true;
  public isSessionUser = false;
  public user: User;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private friendshipService: FriendshipService,
    private router: Router,
    private sessionService: SessionService,
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        mergeMap((params: Params) => {
          this.isLoading = true;
          this.user = undefined;
          this.isSessionUser = this.sessionService.isSessionUser(params.userId);
          return this.userService.getById(params.userId);
        }),
        mergeMap((user: User) => {
          this.user = user;
          return this.friendshipService.getAllByUserId(user.id);
        }),
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe(
        (friendships: FriendshipSummary) => {
          this.friends = friendships[this.type];
          this.isLoading = false;
          this.changeDetector.markForCheck();
        },
        () => {
          this.alertService.error('Friendships not found.', true);
          this.router.navigate(['/users']);
        },
      );
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
