import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  IconModule,
  RepeaterModule
} from '../../modules';

import {
  NotificationService
} from './notification.service';

import {
  NotificationsRoutingModule
} from './notifications-routing.module';

import {
  NotificationsComponent
} from './notifications.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    NotificationsRoutingModule,
    RepeaterModule
  ],
  declarations: [
    NotificationsComponent
  ],
  providers: [
    NotificationService
  ]
})
export class NotificationsModule { }
