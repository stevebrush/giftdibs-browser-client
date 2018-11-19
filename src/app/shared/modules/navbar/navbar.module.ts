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
  SearchModule
} from '@app/shared/modules/search';

import {
  BadgeModule,
  DropdownMenuModule,
  MediaModule,
  MediaQueryModule,
  ThumbnailModule
} from '@giftdibs/ux';

import {
  IconModule
} from '@giftdibs/ux';

import {
  NotificationsModule
} from '../notifications';

import {
  NavbarComponent
} from './navbar.component';

@NgModule({
  imports: [
    BadgeModule,
    CommonModule,
    DropdownMenuModule,
    IconModule,
    MediaModule,
    MediaQueryModule,
    RouterModule,
    NotificationsModule,
    SearchModule,
    ThumbnailModule
  ],
  exports: [
    NavbarComponent
  ],
  declarations: [
    NavbarComponent
  ]
})
export class NavbarModule { }
