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
  BadgeModule,
  IconModule,
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
