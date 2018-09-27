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
  FriendshipModule
} from '@app/shared/modules/friendship';

import {
  BadgeModule,
  IconModule,
  MediaModule,
  PopoverModule,
  RepeaterModule
} from '@app/ui';

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
    MediaModule,
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
