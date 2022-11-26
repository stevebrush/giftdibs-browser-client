import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CardModule,
  GridModule,
  HideUntilModule,
  IconModule,
  MediaModule,
  NoticeModule,
  ThumbnailModule,
  WaitModule,
} from '@giftdibs/ux';

import { FriendshipModule } from 'src/app/shared/modules/friendship';
import { UserPreviewModule } from 'src/app/shared/modules/user-preview/user-preview.module';
import { WishListEditModule } from 'src/app/shared/modules/wish-list-edit';
import { WishListPreviewModule } from 'src/app/shared/modules/wish-list-preview';

import { FollowersComponent } from './followers.component';
import { FollowingComponent } from './following.component';
import { FriendListComponent } from './friend-list.component';
import { UserComponent } from './user.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    FriendshipModule,
    GridModule,
    HideUntilModule,
    IconModule,
    MediaModule,
    NoticeModule,
    ThumbnailModule,
    UserPreviewModule,
    UsersRoutingModule,
    WaitModule,
    WishListEditModule,
    WishListPreviewModule,
  ],
  declarations: [
    UserComponent,
    UsersComponent,
    FollowersComponent,
    FollowingComponent,
    FriendListComponent,
  ],
})
export class UsersModule {}
