import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  CardModule,
  GridModule,
  MediaModule,
  RepeaterModule,
  TabsModule,
  ThumbnailModule,
  WaitModule
} from '@app/ui';

import {
  DibControlsModule
} from '@app/shared/modules/dib-controls';

import {
  GiftPreviewModule
} from '@app/shared/modules/gift-preview';

import {
  DibService
} from '@app/shared/modules/dib';

import {
  DibsComponent
} from './dibs.component';

import {
  DibsRoutingModule
} from './dibs-routing.module';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    DibControlsModule,
    DibsRoutingModule,
    GiftPreviewModule,
    GridModule,
    MediaModule,
    RepeaterModule,
    TabsModule,
    ThumbnailModule,
    WaitModule
  ],
  declarations: [
    DibsComponent
  ],
  providers: [
    DibService
  ]
})
export class DibsModule { }
