import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterModule
} from '@angular/router';

import { CardModule } from '../../../modules/card/card.module';
import { HideUntilModule } from '../../../modules/hide-until/hide-until.module';
import { MediaModule } from '../../../modules/media/media.module';
import { UserThumbnailModule } from '../../../modules/user-thumbnail/user-thumbnail.module';

import { FollowButtonComponent } from './follow-button.component';
import { FriendshipService } from './friendship.service';
import { FriendshipsComponent } from './friendships.component';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    HideUntilModule,
    MediaModule,
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
