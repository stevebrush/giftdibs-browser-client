import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  CardModule,
  ThumbnailModule
} from '@giftdibs/ux';

import { ProductPreviewComponent } from './product-preview.component';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    ThumbnailModule
  ],
  exports: [
    ProductPreviewComponent
  ],
  declarations: [
    ProductPreviewComponent
  ]
})
export class ProductPreviewModule { }
