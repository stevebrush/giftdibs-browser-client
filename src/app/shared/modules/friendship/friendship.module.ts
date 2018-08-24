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
  DropdownMenuModule,
  GridModule,
  HideUntilModule,
  IconModule,
  MediaModule,
  RepeaterModule,
  ThumbnailModule
} from '@app/ui';

import { FollowButtonComponent } from './follow-button.component';
import { FriendshipService } from './friendship.service';
import { FriendshipsComponent } from './friendships.component';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    DropdownMenuModule,
    GridModule,
    HideUntilModule,
    MediaModule,
    IconModule,
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
