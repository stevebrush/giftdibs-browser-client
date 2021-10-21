import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GiftPriorityModule } from '@app/shared/modules/gift-priority';
import {
  CardModule,
  DateTimeModule,
  IconModule,
  MediaModule,
  RibbonModule,
  ThumbnailModule,
} from '@giftdibs/ux';

import { GiftPreviewComponent } from './gift-preview.component';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    DateTimeModule,
    GiftPriorityModule,
    IconModule,
    MediaModule,
    RibbonModule,
    RouterModule,
    ThumbnailModule,
  ],
  declarations: [GiftPreviewComponent],
  exports: [GiftPreviewComponent],
})
export class GiftPreviewModule {}
