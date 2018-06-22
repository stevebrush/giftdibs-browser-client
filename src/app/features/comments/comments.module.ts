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
// #endregion

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CommentService
  ]
})
export class CommentsModule { }
