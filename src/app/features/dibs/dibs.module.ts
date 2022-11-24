import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CardModule,
  GridModule,
  MediaModule,
  NoticeModule,
  RepeaterModule,
  ThumbnailModule,
  WaitModule,
} from '@giftdibs/ux';

import { DibControlsModule } from 'src/app/shared/modules/dib-controls';
import { GiftPreviewModule } from 'src/app/shared/modules/gift-preview';

import { DibsRoutingModule } from './dibs-routing.module';
import { DibsComponent } from './dibs.component';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    DibControlsModule,
    DibsRoutingModule,
    GiftPreviewModule,
    GridModule,
    MediaModule,
    NoticeModule,
    RepeaterModule,
    ThumbnailModule,
    WaitModule,
  ],
  declarations: [DibsComponent],
})
export class DibsModule {}
