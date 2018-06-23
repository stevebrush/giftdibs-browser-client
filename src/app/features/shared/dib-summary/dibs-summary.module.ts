import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  IconModule,
  RepeaterModule
} from '../../../modules';

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
