import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HideUntilModule } from '@giftdibs/ux';
import { IconModule } from '@giftdibs/ux';

import { FollowButtonComponent } from './follow-button.component';
import { FriendshipService } from './friendship.service';
import { FriendshipsComponent } from './friendships.component';

@NgModule({
  imports: [CommonModule, HideUntilModule, IconModule, RouterModule],
  exports: [FriendshipsComponent, FollowButtonComponent],
  declarations: [FriendshipsComponent, FollowButtonComponent],
  providers: [FriendshipService],
})
export class FriendshipModule {}
