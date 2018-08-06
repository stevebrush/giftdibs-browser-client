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
  MediaModule
} from '../media';

import {
  ThumbnailModule
} from '../thumbnail';

import {
  GdImageUploaderComponent
} from './image-uploader.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    MediaModule,
    ThumbnailModule
  ],
  declarations: [
    GdImageUploaderComponent
  ],
  exports: [
    GdImageUploaderComponent
  ]
})
export class GdImageUploaderModule { }
