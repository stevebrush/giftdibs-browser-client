import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FriendshipModule
} from '@app/shared/modules/friendship';

import {
  UserModule
} from '@app/shared/modules/user';

import {
  WishListModule
} from '@app/shared/modules/wish-list';

import {
  WishListCreateModule
} from '@app/shared/modules/wish-list-create';

import {
  WishListPreviewModule
} from '@app/shared/modules/wish-list-preview';

import {
  CardModule,
  GridModule,
  HideUntilModule,
  MediaModule,
  RepeaterModule,
  ThumbnailModule,
  WaitModule
} from '@giftdibs/ux';

import {
  IconModule
} from '@giftdibs/ux';

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
    UsersRoutingModule,
    RepeaterModule,
    ThumbnailModule,
    UserModule,
    WaitModule,
    WishListModule,
    WishListCreateModule,
    WishListPreviewModule
  ],
  declarations: [
    UsersComponent,
    UserComponent,
    FollowersComponent,
    FollowingComponent,
    FriendListComponent
  ]
})
export class UsersModule { }
