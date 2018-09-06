import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  CardModule,
  GridModule,
  HideUntilModule,
  MediaModule,
  ThumbnailModule,
  IconModule,
  RepeaterModule
} from '@app/ui';

import {
  FriendshipModule
} from '@app/shared/modules/friendship';

import {
  UserModule
} from '@app/shared/modules/user';

import {
  WishListCreateModule
} from '@app/shared/modules/wish-list-create';

import {
  WishListPreviewModule
} from '@app/shared/modules/wish-list-preview';

import {
  WishListModule
} from '@app/shared/modules/wish-list';

import { UserComponent } from './user.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { FollowersComponent } from '@app/modules/users/followers.component';
import { FollowingComponent } from '@app/modules/users/following.component';
import { FriendListComponent } from '@app/modules/users/friend-list.component';

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
