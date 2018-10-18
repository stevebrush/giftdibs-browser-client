import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  GiftEditModule
} from '@app/shared/modules/gift-edit';

import {
  GiftPreviewModule
} from '@app/shared/modules/gift-preview';

import {
  WishListModule
} from '@app/shared/modules/wish-list';

import {
  WishListEditModule
} from '@app/shared/modules/wish-list-edit';

import {
  CardModule,
  ConfirmModule,
  DropdownMenuModule,
  IconModule,
  MediaModule,
  NoticeModule,
  RepeaterModule,
  ThumbnailModule,
  WaitModule
} from '@app/ui';

import { WishListComponent } from './wish-list.component';
import { WishListsRoutingModule } from './wish-lists-routing.module';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    ConfirmModule,
    DropdownMenuModule,
    GiftEditModule,
    GiftPreviewModule,
    IconModule,
    MediaModule,
    NoticeModule,
    RepeaterModule,
    ThumbnailModule,
    WaitModule,
    WishListEditModule,
    WishListModule,
    WishListsRoutingModule
  ],
  declarations: [
    WishListComponent
  ]
})
export class WishListsModule { }
