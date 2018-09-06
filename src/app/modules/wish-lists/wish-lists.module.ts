import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { WishListModule } from '@app/shared/modules/wish-list';

import { WishListComponent } from './wish-list.component';
import { WishListsRoutingModule } from './wish-lists-routing.module';
import { MediaModule, ThumbnailModule, GridModule, CardModule, IconModule, ModalModule } from '@app/ui';
import { RouterModule } from '@angular/router';
import { GiftPriorityModule } from '@app/shared/modules/gift-priority';
import { WishListEditModule } from '@app/shared/modules/wish-list-edit';
import { GiftEditModule } from '@app/shared/modules/gift-edit';
import { DibRibbonModule } from '@app/shared/modules/dib-ribbon/dib-ribbon.module';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    DibRibbonModule,
    GiftEditModule,
    GiftPriorityModule,
    GridModule,
    IconModule,
    MediaModule,
    ModalModule,
    RouterModule,
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
