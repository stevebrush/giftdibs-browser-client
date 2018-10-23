import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  IconModule
} from '@giftdibs/ux';

import {
  GiftPriorityComponent
} from './gift-priority.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule
  ],
  declarations: [
    GiftPriorityComponent
  ],
  exports: [
    GiftPriorityComponent
  ]
})
export class GiftPriorityModule { }
