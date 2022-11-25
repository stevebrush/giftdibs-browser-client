import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CardModule,
  DateTimeModule,
  IconModule,
  MediaModule,
  ThumbnailModule,
} from '@giftdibs/ux';

import { WishListPreviewComponent } from './wish-list-preview.component';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    DateTimeModule,
    IconModule,
    MediaModule,
    RouterModule,
    ThumbnailModule,
  ],
  declarations: [WishListPreviewComponent],
  exports: [WishListPreviewComponent],
})
export class WishListPreviewModule {}
