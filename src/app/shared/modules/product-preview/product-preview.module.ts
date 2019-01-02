import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  CardModule,
  IconModule,
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
    IconModule,
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
