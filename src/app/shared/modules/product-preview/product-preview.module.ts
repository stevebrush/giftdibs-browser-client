import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  CardModule,
  ModalModule,
  ThumbnailModule
} from '@giftdibs/ux';

import {
  AssetsModule
} from '../assets';

import { ProductPreviewComponent } from './product-preview.component';

@NgModule({
  imports: [
    AssetsModule,
    CardModule,
    CommonModule,
    ModalModule,
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
