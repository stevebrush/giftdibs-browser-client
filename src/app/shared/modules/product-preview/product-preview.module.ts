import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CardModule,
  IconModule,
  ModalModule,
  ThumbnailModule,
} from '@giftdibs/ux';

import { ProductPreviewComponent } from './product-preview.component';

@NgModule({
  imports: [CardModule, CommonModule, IconModule, ModalModule, ThumbnailModule],
  exports: [ProductPreviewComponent],
  declarations: [ProductPreviewComponent],
})
export class ProductPreviewModule {}
