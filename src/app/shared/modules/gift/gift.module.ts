// #region imports
import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  GiftService
} from './gift.service';
// #endregion

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    GiftService
  ]
})
export class GiftModule { }
