import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  DibsSummaryComponent
} from './dibs-summary.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DibsSummaryComponent
  ],
  exports: [
    DibsSummaryComponent
  ]
})
export class DibsSummaryModule { }
