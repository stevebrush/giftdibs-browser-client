import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FriendshipModule } from '@app/shared/modules/friendship';
import { IconModule } from '@giftdibs/ux';
import { BadgeModule, PopoverModule, RepeaterModule } from '@giftdibs/ux';

import { NotificationService } from './notification.service';
import { NotificationsComponent } from './notifications.component';

@NgModule({
  imports: [
    BadgeModule,
    CommonModule,
    FriendshipModule,
    PopoverModule,
    IconModule,
    RepeaterModule,
    RouterModule,
  ],
  exports: [NotificationsComponent],
  declarations: [NotificationsComponent],
  providers: [NotificationService],
})
export class NotificationsModule {}
