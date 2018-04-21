import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AlertService } from '../../../modules/alert/alert.service';
import { FriendshipService } from './friendship.service';
import { User } from '../user';
import { SessionService } from '../../../modules/session/session.service';
import { Friendship } from './friendship';
import 'rxjs/add/operator/finally';

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

  private friendship: Friendship;

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private friendshipService: FriendshipService,
    private sessionService: SessionService
  ) { }

  public ngOnInit() {
    const sessionUserId = this.sessionService.user._id;
    this.isSessionUser = this.sessionService.isSessionUser(this.friend._id);

    this.friendshipService.getAllByUserId(sessionUserId).subscribe((friendships: Friendship[]) => {
      this.friendship = this.getSessionUserFriendship(friendships);
      this.isFollowing = !!this.friendship;
      this.isLoading = false;
      this.changeDetector.markForCheck();
    });
  }

  public createFriendship(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();
    this.friendshipService
      .create(this.friend._id)
      .finally(() => {
        this.isLoading = false;
        this.changeDetector.markForCheck();
      })
      .subscribe(
        (data: any) => {
          this.isFollowing = true;
          this.alertService.success(data.message);
        },
        (err: any) => {
          this.alertService.error(err.error.message);
        }
      );
  }

  public removeFriendship(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();

    if (!this.friendship) {
      return;
    }

    this.friendshipService
      .remove(this.friendship._id)
      .finally(() => {
        this.isLoading = false;
        this.isFollowing = false;
        this.changeDetector.markForCheck();
      })
      .subscribe(
        (data: any) => {
          this.alertService.success(data.message);
        },
        (err: any) => {
          this.alertService.error(err.error.message);
        }
      );
  }

  private getSessionUserFriendship(friendships: Friendship[]) {
    const sessionUserId = this.sessionService.user._id;
    return friendships.find((friendship: Friendship) => {
      return (
        friendship.user._id === sessionUserId &&
        friendship.friend._id === this.friend._id
      );
    });
  }

  // private refreshFriendships() {
  //   this.isLoading = true;
  //   this.changeDetector.markForCheck();
  //   this.friendshipService
  //     .getAllByUserId(this.friend._id)
  //     .subscribe((friendships: Friendship[]) => {
  //       this.friendships = friendships;
  //       this.isLoading = false;
  //       this.changeDetector.markForCheck();
  //     });
  // }
}
