import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { User } from '@app/shared/modules/user';

import { FriendshipSummary } from './friendship-summary';
import { FriendshipService } from './friendship.service';

@Component({
  selector: 'gd-friendships',
  templateUrl: './friendships.component.html',
  styleUrls: ['./friendships.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendshipsComponent implements OnInit, OnChanges {
  @Input()
  public user: User;

  public friendships: FriendshipSummary;
  public followers: any[];
  public following: any[];
  public isLoading = true;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private friendshipService: FriendshipService,
  ) {}

  public ngOnInit(): void {
    this.assignFriendships();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.user && !changes.user.isFirstChange()) {
      this.isLoading = true;
      this.changeDetector.markForCheck();
      this.assignFriendships();
    }
  }

  private assignFriendships(): void {
    this.isLoading = true;
    this.changeDetector.markForCheck();
    this.friendshipService
      .getAllByUserId(this.user.id)
      .subscribe((friendships: FriendshipSummary) => {
        this.friendships = friendships;
        this.followers = friendships.followers;
        this.following = friendships.following;
        this.isLoading = false;
        this.changeDetector.markForCheck();
      });
  }
}
