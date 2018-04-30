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

import {
  GD_AUTHORIZATION_PROVIDERS
} from '../../../modules/session';

import { UserThumbnailModule } from '../../../modules/user-thumbnail/user-thumbnail.module';

import { FollowButtonComponent } from './follow-button.component';
import { FriendshipService } from './friendship.service';
import { FriendshipsComponent } from './friendships.component';
import { GridModule } from '../../../modules/grid/grid.module';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    GridModule,
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
    FriendshipService,
    GD_AUTHORIZATION_PROVIDERS
  ]
})
export class FriendshipModule { }
