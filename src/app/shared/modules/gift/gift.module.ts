// #region imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GiftService } from './gift.service';

// #endregion

@NgModule({
  imports: [CommonModule],
  providers: [GiftService],
})
export class GiftModule {}
