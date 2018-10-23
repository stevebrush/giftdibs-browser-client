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
  IconModule
} from '@giftdibs/ux';

import {
  CardModule,
  ThumbnailModule
} from '@giftdibs/ux';

import {
  WishListPreviewComponent
} from './wish-list-preview.component';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
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
