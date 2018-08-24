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

import { RouterModule } from '@angular/router';

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
