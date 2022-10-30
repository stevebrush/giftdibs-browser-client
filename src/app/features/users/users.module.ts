import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CardModule,
  GridModule,
  HideUntilModule,
  IconModule,
  MediaModule,
  NoticeModule,
  RepeaterModule,
  ThumbnailModule,
  WaitModule,
} from '@giftdibs/ux';

import { FriendshipModule } from 'src/app/shared/modules/friendship';
import { UserModule } from 'src/app/shared/modules/user';
import { WishListModule } from 'src/app/shared/modules/wish-list';
import { WishListEditModule } from 'src/app/shared/modules/wish-list-edit';
import { WishListPreviewModule } from 'src/app/shared/modules/wish-list-preview';

import { FollowersComponent } from './followers.component';
import { FollowingComponent } from './following.component';
import { FriendListComponent } from './friend-list.component';
import { UserComponent } from './user.component';
import { UsersRoutingModule } from './users-routing.module';

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
    UsersRoutingModule,
    RepeaterModule,
    ThumbnailModule,
    UserModule,
    WaitModule,
    WishListEditModule,
    WishListModule,
    WishListPreviewModule,
  ],
  declarations: [
    UserComponent,
    FollowersComponent,
    FollowingComponent,
    FriendListComponent,
  ],
})
export class UsersModule {}
