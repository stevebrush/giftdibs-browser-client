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
} from '../icon';

import {
  ThumbnailComponent
} from './thumbnail.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    RouterModule
  ],
  exports: [
    ThumbnailComponent
  ],
  declarations: [
    ThumbnailComponent
  ]
})
export class ThumbnailModule { }
