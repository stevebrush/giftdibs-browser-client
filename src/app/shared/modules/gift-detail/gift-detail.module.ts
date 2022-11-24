import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ConfirmModule,
  DateTimeModule,
  DisclosureModule,
  DropdownMenuModule,
  GridModule,
  IconModule,
  MediaModule,
  ModalModule,
  NoticeModule,
  ThumbnailModule,
  WaitModule,
} from '@giftdibs/ux';

import { CommentModule } from 'src/app/shared/modules/comment';
import { DibControlsModule } from 'src/app/shared/modules/dib-controls';
import { GiftEditModule } from 'src/app/shared/modules/gift-edit';
import { GiftMoveModule } from 'src/app/shared/modules/gift-move';
import { GiftPriorityModule } from 'src/app/shared/modules/gift-priority';
import { ProductPreviewModule } from 'src/app/shared/modules/product-preview';

import { GiftDetailComponent } from './gift-detail.component';

@NgModule({
  imports: [
    CommonModule,
    DateTimeModule,
    DisclosureModule,
    GiftMoveModule,
    CommentModule,
    ConfirmModule,
    DibControlsModule,
    DropdownMenuModule,
    GiftEditModule,
    GiftPriorityModule,
    GridModule,
    IconModule,
    MediaModule,
    ModalModule,
    NoticeModule,
    ProductPreviewModule,
    RouterModule,
    ThumbnailModule,
    WaitModule,
  ],
  declarations: [GiftDetailComponent],
})
export class GiftDetailModule {}
