import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

import {
  ChecklistChoice
} from '../../../modules/checklist';

import {
  OverlayInstance
} from '../../../modules/overlay';

import { User } from '../../users';
import { Friendship } from '../../users/friendship/friendship';
import { FriendshipService } from '../../users/friendship/friendship.service';

import { WishListPrivacySelectorUsersContext } from './wish-list-privacy-selector-users-context';

@Component({
  selector: 'gd-wish-list-privacy-selector-users',
  templateUrl: './wish-list-privacy-selector-users.component.html',
  styleUrls: ['./wish-list-privacy-selector-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishListPrivacySelectorUsersComponent implements OnInit {
  public choices: ChecklistChoice[];
  public isReady = false;
  public usersForm: FormGroup;
  public saved = new EventEmitter<any>();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private context: WishListPrivacySelectorUsersContext,
    private formBuilder: FormBuilder,
    private friendshipService: FriendshipService,
    private overlayInstance: OverlayInstance<any>
  ) { }

  public ngOnInit(): void {
    this.createForm();
    this.usersForm.controls.friends.reset(this.context.selected);

    this.friendshipService.getAllByUserId(this.context.user._id)
      .subscribe((friendships: Friendship[]) => {
        const friends: User[] = friendships.map((friendship: Friendship) => {
          if (friendship.user._id === this.context.user._id) {
            return friendship.friend;
          }

          return friendship.user;
        });

        const unique: User[] = [];
        friends.forEach(friend => {
          const found = unique.find(u => u._id === friend._id);
          if (!found) {
            unique.push(friend);
          }
        });

        this.choices = unique.map((friend) => {
          return {
            value: friend._id,
            label: `${friend.firstName} ${friend.lastName}`
          };
        });

        this.isReady = true;
        this.changeDetector.markForCheck();
      });
  }

  public save(): void {
    const value = this.usersForm.controls.friends.value;
    this.saved.emit({ value });
    this.saved.complete();
    this.overlayInstance.destroy();
  }

  public onCancelClicked(): void {
    this.overlayInstance.destroy();
  }

  private createForm(): void {
    this.usersForm = this.formBuilder.group({
      friends: new FormControl(null, [])
    });
  }
}
