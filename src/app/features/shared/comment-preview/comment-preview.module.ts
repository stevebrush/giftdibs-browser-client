import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  DropdownMenuModule,
  IconModule,
  MediaModule,
  ThumbnailModule
} from '../../../modules';

import {
  CommentPreviewComponent
} from './comment-preview.component';

@NgModule({
  imports: [
    CommonModule,
    DropdownMenuModule,
    IconModule,
    MediaModule,
    ThumbnailModule
  ],
  exports: [
    CommentPreviewComponent
  ],
  declarations: [
    CommentPreviewComponent
  ]
})
export class CommentPreviewModule { }
