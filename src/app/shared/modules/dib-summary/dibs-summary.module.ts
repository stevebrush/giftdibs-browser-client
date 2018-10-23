import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RepeaterModule
} from '@giftdibs/ux';

import {
  IconModule
} from '@giftdibs/ux';

import {
  DibsSummaryComponent
} from './dibs-summary.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    RepeaterModule
  ],
  declarations: [
    DibsSummaryComponent
  ],
  exports: [
    DibsSummaryComponent
  ]
})
export class DibsSummaryModule { }
