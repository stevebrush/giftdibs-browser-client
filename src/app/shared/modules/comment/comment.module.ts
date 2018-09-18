// #region imports
import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  RouterModule
} from '@angular/router';

import {
  DropdownMenuModule,
  FormFieldModule,
  IconModule,
  MediaModule,
  RepeaterModule,
  ThumbnailModule
} from '@app/ui';

import {
  CommentEditComponent
} from './comment-edit.component';

import {
  CommentListComponent
} from './comment-list.component';

import {
  CommentPreviewComponent
} from './comment-preview.component';

import {
  CommentService
} from './comment.service';
// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DropdownMenuModule,
    FormFieldModule,
    IconModule,
    MediaModule,
    ReactiveFormsModule,
    RepeaterModule,
    RouterModule,
    ThumbnailModule
  ],
  providers: [
    CommentService
  ],
  declarations: [
    CommentEditComponent,
    CommentListComponent,
    CommentPreviewComponent
  ],
  exports: [
    CommentEditComponent,
    CommentListComponent,
    CommentPreviewComponent
  ]
})
export class CommentModule { }
