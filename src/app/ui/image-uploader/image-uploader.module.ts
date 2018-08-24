import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

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
