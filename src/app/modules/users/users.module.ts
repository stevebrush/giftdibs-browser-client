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
  ThumbnailModule
} from '@app/ui';

import {
  FriendshipModule
} from '@app/shared/modules/friendship';

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
import { UserModule } from '../../shared/modules/user';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    FriendshipModule,
    GridModule,
    HideUntilModule,
    MediaModule,
    UsersRoutingModule,
    ThumbnailModule,
    UserModule,
    WishListModule,
    WishListCreateModule,
    WishListPreviewModule
  ],
  declarations: [
    UsersComponent,
    UserComponent
  ]
})
export class UsersModule { }
