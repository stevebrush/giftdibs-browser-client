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
  CardModule,
  GridModule,
  HideUntilModule,
  MediaModule,
  RepeaterModule,
  ThumbnailModule
} from '../../modules';

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
    ThumbnailModule
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
