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
  GDNavbarComponent
} from './navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    GDNavbarComponent
  ],
  declarations: [
    GDNavbarComponent
  ]
})
export class GDNavbarModule { }
