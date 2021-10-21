import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DibService } from '@app/shared/modules/dib';
import { DibControlsModule } from '@app/shared/modules/dib-controls';
import { GiftPreviewModule } from '@app/shared/modules/gift-preview';
import {
  CardModule,
  GridModule,
  MediaModule,
  NoticeModule,
  RepeaterModule,
  ThumbnailModule,
  WaitModule,
} from '@giftdibs/ux';

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
  providers: [DibService],
})
export class DibsModule {}
