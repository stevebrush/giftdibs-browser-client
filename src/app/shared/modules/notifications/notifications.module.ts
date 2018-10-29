import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterModule
} from '@angular/router';

import {
  IconModule
} from '@giftdibs/ux';

import {
  FriendshipModule
} from '@app/shared/modules/friendship';

import {
  BadgeModule,
  PopoverModule,
  RepeaterModule
} from '@giftdibs/ux';

import {
  NotificationService
} from './notification.service';

import {
  NotificationsComponent
} from './notifications.component';

@NgModule({
  imports: [
    BadgeModule,
    CommonModule,
    FriendshipModule,
    PopoverModule,
    IconModule,
    RepeaterModule,
    RouterModule
  ],
  exports: [
    NotificationsComponent
  ],
  declarations: [
    NotificationsComponent
  ],
  providers: [
    NotificationService
  ]
})
export class NotificationsModule { }
