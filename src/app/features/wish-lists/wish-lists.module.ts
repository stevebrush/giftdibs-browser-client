import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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

import { GiftEditModule } from 'src/app/shared/modules/gift-edit';
import { GiftPreviewModule } from 'src/app/shared/modules/gift-preview';
import { WishListEditModule } from 'src/app/shared/modules/wish-list-edit';

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
    WishListsRoutingModule,
  ],
  declarations: [WishListComponent],
})
export class WishListsModule {}
