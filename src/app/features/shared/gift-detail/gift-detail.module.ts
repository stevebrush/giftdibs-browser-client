import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ConfirmModule,
  GridModule,
  IconModule,
  ModalModule
} from '../../../modules';

import {
  CommentEditModule
} from '../comment-edit';

import {
  DibControlsModule
} from '../dib-controls';

import {
  GiftDetailComponent
} from './gift-detail.component';

@NgModule({
  imports: [
    CommentEditModule,
    CommonModule,
    ConfirmModule,
    DibControlsModule,
    GridModule,
    IconModule,
    ModalModule
  ],
  declarations: [
    GiftDetailComponent
  ],
  exports: [
    GiftDetailComponent
  ]
})
export class GiftDetailModule { }
