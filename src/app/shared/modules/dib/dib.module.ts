import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DibService } from './dib.service';

@NgModule({
  imports: [CommonModule],
  providers: [DibService],
})
export class DibModule {}
