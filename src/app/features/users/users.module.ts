import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';


import { FriendshipModule } from './friendship/friendship.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user.service';

import { GridModule } from '../../modules/grid/grid.module';
import { HideUntilModule } from '../../modules/hide-until/hide-until.module';
import { MediaModule } from '../../modules/media/media.module';

import {
  GD_AUTHORIZATION_PROVIDERS
} from '../../modules/session';

import { UserThumbnailModule } from '../../modules/user-thumbnail/user-thumbnail.module';
import { WishListsModule } from '../wish-lists/wish-lists.module';
import { CardModule } from '../../modules/card/card.module';

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
    UserService,
    GD_AUTHORIZATION_PROVIDERS
  ]
})
export class UsersModule { }
