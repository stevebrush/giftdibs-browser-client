import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftsRoutingModule } from './gifts-routing.module';
import { GiftComponent } from '@app/modules/gifts/gift.component';
import { GiftModule } from '@app/shared/modules/gift';
import { MediaModule, ThumbnailModule, ModalModule, IconModule, ConfirmModule } from '@app/ui';
import { GiftEditModule } from '@app/shared/modules/gift-edit';
import { GiftPriorityModule } from '@app/shared/modules/gift-priority';
import { CommentModule } from '@app/shared/modules/comment';
import { DibControlsModule } from '@app/shared/modules/dib-controls';

@NgModule({
  imports: [
    CommonModule,
    GiftModule,
    CommentModule,
    ConfirmModule,
    DibControlsModule,
    GiftEditModule,
    GiftPriorityModule,
    GiftsRoutingModule,
    IconModule,
    MediaModule,
    ModalModule,
    ThumbnailModule
  ],
  declarations: [
    GiftComponent
  ]
})
export class GiftsModule { }
