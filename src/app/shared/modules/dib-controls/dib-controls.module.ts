import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ConfirmModule,
  DropdownMenuModule,
  IconModule,
  NoticeModule,
} from '@giftdibs/ux';

import { DibEditModule } from 'src/app/shared/modules/dib-edit';

import { DibControlsComponent } from './dib-controls.component';

@NgModule({
  imports: [
    CommonModule,
    ConfirmModule,
    DibEditModule,
    DropdownMenuModule,
    IconModule,
    NoticeModule,
    RouterModule,
  ],
  declarations: [DibControlsComponent],
  exports: [DibControlsComponent],
})
export class DibControlsModule {}
