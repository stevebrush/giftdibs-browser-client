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
  IconModule,
  MediaModule,
  RibbonModule,
  ThumbnailModule
} from '@app/ui';

import {
  GiftPriorityModule
} from '@app/shared/modules/gift-priority';

import {
  GiftPreviewComponent
} from './gift-preview.component';

@NgModule({
  imports: [
    CommonModule,
    GiftPriorityModule,
    IconModule,
    MediaModule,
    RibbonModule,
    RouterModule,
    ThumbnailModule
  ],
  declarations: [
    GiftPreviewComponent
  ],
  exports: [
    GiftPreviewComponent
  ]
})
export class GiftPreviewModule { }
