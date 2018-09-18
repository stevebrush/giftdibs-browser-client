import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  CommentModule
} from '@app/shared/modules/comment';

import {
  DibControlsModule
} from '@app/shared/modules/dib-controls';

import {
  GiftModule
} from '@app/shared/modules/gift';

import {
  GiftEditModule
} from '@app/shared/modules/gift-edit';

import {
  GiftPriorityModule
} from '@app/shared/modules/gift-priority';

import {
  ConfirmModule,
  GridModule,
  IconModule,
  MediaModule,
  ModalModule,
  NoticeModule,
  RepeaterModule,
  ThumbnailModule
} from '@app/ui';

import { GiftComponent } from './gift.component';
import { GiftsRoutingModule } from './gifts-routing.module';

@NgModule({
  imports: [
    CommonModule,
    GiftModule,
    CommentModule,
    ConfirmModule,
    DibControlsModule,
    GiftEditModule,
    GiftPriorityModule,
    GiftsRoutingModule,
    GridModule,
    IconModule,
    MediaModule,
    ModalModule,
    NoticeModule,
    RepeaterModule,
    ThumbnailModule
  ],
  declarations: [
    GiftComponent
  ]
})
export class GiftsModule { }
