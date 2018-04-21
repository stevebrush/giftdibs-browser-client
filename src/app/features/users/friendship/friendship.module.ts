import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendshipService } from './friendship.service';
import { FriendshipsComponent } from './friendships.component';
import { RouterModule } from '@angular/router';
import { CardModule } from '../../../modules/card/card.module';
import { FollowButtonComponent } from './follow-button.component';
import { HideUntilModule } from '../../../modules/hide-until/hide-until.module';
import { MediaModule } from '../../../modules/media/media.module';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    HideUntilModule,
    MediaModule,
    RouterModule
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
    FriendshipService
  ]
})
export class FriendshipModule { }
