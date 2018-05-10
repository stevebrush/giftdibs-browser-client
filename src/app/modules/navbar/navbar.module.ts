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
  DropdownMenuModule
} from '../dropdown-menu';

import {
  SearchModule
} from '../search';

import {
  UserThumbnailModule
} from '../user-thumbnail';

import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [
    CommonModule,
    DropdownMenuModule,
    RouterModule,
    SearchModule,
    UserThumbnailModule
  ],
  exports: [
    NavbarComponent
  ],
  declarations: [
    NavbarComponent
  ]
})
export class NavbarModule { }
