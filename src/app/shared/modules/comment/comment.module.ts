// #region imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CharacterCounterModule,
  DateTimeModule,
  DropdownMenuModule,
  FormFieldModule,
  IconModule,
  MediaModule,
  ThumbnailModule,
} from '@giftdibs/ux';

import { CommentEditComponent } from './comment-edit.component';
import { CommentListComponent } from './comment-list.component';
import { CommentPreviewComponent } from './comment-preview.component';
import { CommentService } from './comment.service';

// #endregion

@NgModule({
  imports: [
    CharacterCounterModule,
    CommonModule,
    FormsModule,
    DateTimeModule,
    DropdownMenuModule,
    FormFieldModule,
    IconModule,
    MediaModule,
    ReactiveFormsModule,
    RouterModule,
    ThumbnailModule,
  ],
  providers: [CommentService],
  declarations: [
    CommentEditComponent,
    CommentListComponent,
    CommentPreviewComponent,
  ],
  exports: [
    CommentEditComponent,
    CommentListComponent,
    CommentPreviewComponent,
  ],
})
export class CommentModule {}
