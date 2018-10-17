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
  ImageUploaderComponent
} from './image-uploader.component';

@NgModule({
  imports: [
    CommonModule,
    MediaModule,
    ThumbnailModule
  ],
  declarations: [
    ImageUploaderComponent
  ],
  exports: [
    ImageUploaderComponent
  ]
})
export class ImageUploaderModule { }
