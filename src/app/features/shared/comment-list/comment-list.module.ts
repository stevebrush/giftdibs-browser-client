import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RepeaterModule
} from '../../../modules';

import {
  CommentPreviewModule
} from '../comment-preview';

import {
  CommentListComponent
} from './comment-list.component';

@NgModule({
  imports: [
    CommentPreviewModule,
    CommonModule,
    RepeaterModule
  ],
  exports: [
    CommentListComponent
  ],
  declarations: [
    CommentListComponent
  ]
})
export class CommentListModule { }
