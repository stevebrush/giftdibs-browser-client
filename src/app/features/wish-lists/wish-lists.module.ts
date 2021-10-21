import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GiftEditModule } from '@app/shared/modules/gift-edit';
import { GiftPreviewModule } from '@app/shared/modules/gift-preview';
import { WishListModule } from '@app/shared/modules/wish-list';
import { WishListEditModule } from '@app/shared/modules/wish-list-edit';
import {
  CardModule,
  ConfirmModule,
  DateTimeModule,
  DropdownMenuModule,
  GridModule,
  MediaModule,
  NoticeModule,
  ThumbnailModule,
  WaitModule,
} from '@giftdibs/ux';
import { IconModule } from '@giftdibs/ux';

import { WishListComponent } from './wish-list.component';
import { WishListsRoutingModule } from './wish-lists-routing.module';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    ConfirmModule,
    DateTimeModule,
    DropdownMenuModule,
    GiftEditModule,
    GiftPreviewModule,
    GridModule,
    IconModule,
    MediaModule,
    NoticeModule,
    ThumbnailModule,
    WaitModule,
    WishListEditModule,
    WishListModule,
    WishListsRoutingModule,
  ],
  declarations: [WishListComponent],
})
export class WishListsModule {}
