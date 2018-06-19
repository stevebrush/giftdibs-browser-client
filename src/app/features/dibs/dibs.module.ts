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
  ThumbnailModule
} from '../../modules';

import {
  DibControlsModule
} from '../shared/dib-controls';

import {
  GiftPreviewModule
} from '../shared/gift-preview';

import {
  DibService
} from './dib.service';

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
    ThumbnailModule
  ],
  declarations: [
    DibsComponent
  ],
  providers: [
    DibService
  ]
})
export class DibsModule { }
