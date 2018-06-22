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
  FormFieldModule
} from '../../../modules';

import {
  CommentsModule
} from '../../comments';

import {
  CommentEditComponent
} from './comment-edit.component';

@NgModule({
  imports: [
    CommentsModule,
    CommonModule,
    FormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CommentEditComponent
  ],
  exports: [
    CommentEditComponent
  ]
})
export class CommentEditModule { }
