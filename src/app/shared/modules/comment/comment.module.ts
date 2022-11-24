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
