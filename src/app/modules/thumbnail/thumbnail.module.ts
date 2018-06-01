import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  IconModule
} from '../icon';

import {
  ThumbnailComponent
} from './thumbnail.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [
    ThumbnailComponent
  ],
  declarations: [
    ThumbnailComponent
  ]
})
export class ThumbnailModule { }
