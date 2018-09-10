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
  GiftPreviewComponent
} from './gift-preview.component';
import { CardModule, RibbonModule, ThumbnailModule, IconModule } from '@app/ui';
import { GiftPriorityModule } from '@app/shared/modules/gift-priority';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    GiftPriorityModule,
    IconModule,
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
