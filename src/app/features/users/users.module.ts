import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendshipModule } from './friendship/friendship.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { GridModule } from '../../modules/grid/grid.module';
import { HideUntilModule } from '../../modules/hide-until/hide-until.module';
import { MediaModule } from '../../modules/media/media.module';
import { UserThumbnailModule } from '../../modules/user-thumbnail/user-thumbnail.module';

@NgModule({
  imports: [
    CommonModule,
    FriendshipModule,
    GridModule,
    HideUntilModule,
    MediaModule,
    UsersRoutingModule,
    UserThumbnailModule
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
