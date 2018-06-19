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
  DropdownMenuModule,
  IconModule,
  MediaModule,
  ThumbnailModule
} from '../../../modules';

import {
  GiftService
} from '../../gifts';

import {
  GiftDetailComponent,
  GiftDetailModule
} from '../gift-detail';

import {
  GiftEditComponent,
  GiftEditModule
} from '../gift-edit';

import {
  GiftMoveComponent,
  GiftMoveModule
} from '../gift-move';

import {
  GiftPriorityModule
} from '../gift-priority';

import {
  GiftPreviewComponent
} from './gift-preview.component';

@NgModule({
  imports: [
    CommonModule,
    DropdownMenuModule,
    GiftDetailModule,
    GiftEditModule,
    GiftMoveModule,
    GiftPriorityModule,
    IconModule,
    RouterModule,
    MediaModule,
    ThumbnailModule
  ],
  declarations: [
    GiftPreviewComponent
  ],
  exports: [
    GiftPreviewComponent
  ],
  providers: [
    GiftService
  ],
  entryComponents: [
    GiftDetailComponent,
    GiftEditComponent,
    GiftMoveComponent
  ]
})
export class GiftPreviewModule { }
