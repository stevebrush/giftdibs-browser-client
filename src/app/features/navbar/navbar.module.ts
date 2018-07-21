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
  NotificationsModule
} from '../notifications';

import {
  BadgeModule,
  DropdownMenuModule,
  IconModule,
  SearchModule,
  ThumbnailModule
} from '../../modules';

import {
  NavbarComponent
} from './navbar.component';

@NgModule({
  imports: [
    BadgeModule,
    CommonModule,
    DropdownMenuModule,
    IconModule,
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
