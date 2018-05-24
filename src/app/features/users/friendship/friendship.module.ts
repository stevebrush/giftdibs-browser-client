import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterModule
} from '@angular/router';

import {
  CardModule
} from '../../../modules/card';

import {
  GridModule
} from '../../../modules/grid';

import {
  HideUntilModule
} from '../../../modules/hide-until';

import {
  MediaModule
} from '../../../modules/media';

import {
  RepeaterModule
} from '../../../modules/repeater';

import {
  UserThumbnailModule
} from '../../../modules/user-thumbnail';

import { FollowButtonComponent } from './follow-button.component';
import { FriendshipService } from './friendship.service';
import { FriendshipsComponent } from './friendships.component';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    GridModule,
    HideUntilModule,
    MediaModule,
    RepeaterModule,
    RouterModule,
    UserThumbnailModule
  ],
  exports: [
    FriendshipsComponent,
    FollowButtonComponent
  ],
  declarations: [
    FriendshipsComponent,
    FollowButtonComponent
  ],
  providers: [
    FriendshipService
  ]
})
export class FriendshipModule { }
