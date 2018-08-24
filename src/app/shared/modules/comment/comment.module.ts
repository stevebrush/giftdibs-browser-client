// #region imports
import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  CommentService
} from './comment.service';
import { ThumbnailModule, MediaModule, IconModule, DropdownMenuModule, FormFieldModule, RepeaterModule } from '@app/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentEditComponent } from '@app/shared/modules/comment/comment-edit.component';
import { CommentListComponent } from '@app/shared/modules/comment/comment-list.component';
import { CommentPreviewComponent } from '@app/shared/modules/comment/comment-preview.component';
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
