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
} from '../../modules';

import {
  FriendshipModule
} from '../friendships';

import {
  WishListsModule
} from '../wish-lists';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
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
    ThumbnailModule,
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
