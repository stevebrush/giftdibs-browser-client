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
  IconModule,
  ThumbnailModule
} from '@app/ui';

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
