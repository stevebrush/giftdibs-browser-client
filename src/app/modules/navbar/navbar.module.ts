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
  ThumbnailModule
} from '../thumbnail';

import {
  NavbarComponent
} from './navbar.component';

@NgModule({
  imports: [
    CommonModule,
    DropdownMenuModule,
    RouterModule,
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
