import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterModule
} from '@angular/router';

import {
  CardModule,
  DateTimeModule,
  IconModule,
  ThumbnailModule
} from '@giftdibs/ux';

import {
  WishListPreviewComponent
} from './wish-list-preview.component';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    DateTimeModule,
    IconModule,
    RouterModule,
    ThumbnailModule
  ],
  declarations: [
    WishListPreviewComponent
  ],
  exports: [
    WishListPreviewComponent
  ]
})
export class WishListPreviewModule {}
