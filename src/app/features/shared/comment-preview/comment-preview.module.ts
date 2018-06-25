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
  CommentEditModule
} from '../comment-edit';

import {
  CommentPreviewComponent
} from './comment-preview.component';

@NgModule({
  imports: [
    CommentEditModule,
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
