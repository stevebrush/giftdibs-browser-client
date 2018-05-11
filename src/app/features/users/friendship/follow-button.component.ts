import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  AlertService
} from '../../../modules/alert';

import {
  SessionService
} from '../../../modules/session';

import { User } from '../user';

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
    const sessionUserId = this.sessionService.user._id;
    this.isSessionUser = this.sessionService.isSessionUser(this.friend._id);

    this.friendshipService.getAllByUserId(sessionUserId).subscribe((friendships: Friendship[]) => {
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
      .create(this.friend._id)
      .subscribe(
        (data: any) => {
          this.isFollowing = true;
          this.friendshipId = data.data.friendship._id;
          this.alertService.success(data.message);
        },
        (err: any) => {
          this.alertService.error(err.error.message);
        },
        () => {
          this.isLoading = false;
          this.changeDetector.markForCheck();
        }
      );
  }

  public removeFriendship(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    this.friendshipService
      .remove(this.friendshipId)
      .subscribe(
        (data: any) => {
          this.isFollowing = false;
          this.alertService.success(data.message);
        },
        (err: any) => {
          this.alertService.error(err.error.message);
        },
        () => {
          this.isLoading = false;
          this.changeDetector.markForCheck();
        }
      );
  }

  private getSessionUserFriendship(friendships: Friendship[]): string {
    const sessionUserId = this.sessionService.user._id;
    const found = friendships.find((friendship: Friendship) => {
      return (
        friendship.user._id === sessionUserId &&
        friendship.friend._id === this.friend._id
      );
    });

    return found && found._id;
  }
}
