import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  finalize
} from 'rxjs/operators';

import {
  AlertService
} from '../../modules';

import {
  SessionService
} from '../account/session';

import {
  User
} from '../users';

import { Friendship } from './friendship';
import { FriendshipService } from './friendship.service';

@Component({
  selector: 'gd-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowButtonComponent implements OnInit {
  @Input()
  public friend: User;
  public isLoading = true;
  public isSessionUser = false;
  public isFollowing = false;

  private friendshipId: string;

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private friendshipService: FriendshipService,
    private sessionService: SessionService
  ) { }

  public ngOnInit(): void {
    const sessionUserId = this.sessionService.user.id;
    this.isSessionUser = this.sessionService.isSessionUser(this.friend.id);

    this.friendshipService
      .getAllByUserId(sessionUserId)
      .subscribe((friendships: Friendship[]) => {
        this.friendshipId = this.getSessionUserFriendship(friendships);
        this.isFollowing = !!this.friendshipId;
        this.isLoading = false;
        this.changeDetector.markForCheck();
      });
  }

  public createFriendship(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    this.friendshipService
      .create(this.friend.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe(
        (result: any) => {
          this.isFollowing = true;
          this.friendshipId = result.data.friendshipId;
        },
        (err: any) => {
          this.alertService.error(err.error.message);
        }
      );
  }

  public removeFriendship(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    this.friendshipService
      .remove(this.friendshipId)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.changeDetector.markForCheck();
        })
      )
      .subscribe(
        (data: any) => {
          this.isFollowing = false;
        },
        (err: any) => {
          this.alertService.error(err.error.message);
        }
      );
  }

  private getSessionUserFriendship(friendships: Friendship[]): string {
    const sessionUserId = this.sessionService.user.id;
    const found = friendships.find((friendship: Friendship) => {
      return (
        friendship.user.id === sessionUserId &&
        friendship.friend.id === this.friend.id
      );
    });

    return found && found.id;
  }
}
