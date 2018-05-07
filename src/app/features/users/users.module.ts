import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  CardModule
} from '../../modules/card';

import {
  GridModule
} from '../../modules/grid';

import {
  HideUntilModule
} from '../../modules/hide-until';

import {
  MediaModule
} from '../../modules/media';

import {
  UserThumbnailModule
} from '../../modules/user-thumbnail';

import { WishListsModule } from '../wish-lists/wish-lists.module';

import { FriendshipModule } from './friendship/friendship.module';
import { UserService } from './user.service';
import { UserComponent } from './user/user.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    FriendshipModule,
    GridModule,
    HideUntilModule,
    MediaModule,
    UsersRoutingModule,
    UserThumbnailModule,
    WishListsModule
  ],
  declarations: [
    UsersComponent,
    UserComponent
  ],
  providers: [
    UserService
  ]
})
export class UsersModule { }
