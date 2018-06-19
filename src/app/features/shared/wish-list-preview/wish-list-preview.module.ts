import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  CardModule,
  ConfirmModule,
  DropdownMenuModule,
  IconModule,
  RepeaterModule
} from '../../../modules';

import {
  GiftPreviewModule
} from '../gift-preview';

import {
  WishListEditComponent,
  WishListEditModule
} from '../wish-list-edit';

import {
  WishListPreviewComponent
} from './wish-list-preview.component';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    ConfirmModule,
    DropdownMenuModule,
    GiftPreviewModule,
    IconModule,
    RepeaterModule,
    WishListEditModule
  ],
  declarations: [
    WishListPreviewComponent
  ],
  exports: [
    WishListPreviewComponent
  ],
  entryComponents: [
    WishListEditComponent
  ]
})
export class WishListPreviewModule {}
