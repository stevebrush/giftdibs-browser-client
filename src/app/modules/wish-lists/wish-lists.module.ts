import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { WishListModule } from '@app/shared/modules/wish-list';

import { WishListComponent } from './wish-list.component';
import { WishListsRoutingModule } from './wish-lists-routing.module';
import { WishListEditModule } from '@app/shared/modules/wish-list-edit';
import { MediaModule, ThumbnailModule, GridModule, IconModule, CardModule } from '@app/ui';
import { GiftPreviewModule } from '@app/shared/modules/gift-preview';
import { GiftEditModule } from '@app/shared/modules/gift-edit';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    GiftEditModule,
    GiftPreviewModule,
    GridModule,
    IconModule,
    MediaModule,
    ThumbnailModule,
    WishListEditModule,
    WishListModule,
    WishListsRoutingModule
  ],
  declarations: [
    WishListComponent
  ]
})
export class WishListsModule { }
