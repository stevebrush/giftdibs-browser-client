import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FocusTrapModule
} from '../focus-trap';

import {
  OverlayModule
} from '../overlay';

import { ConfirmComponent } from './confirm.component';
import { ConfirmService } from './confirm.service';

@NgModule({
  imports: [
    CommonModule,
    FocusTrapModule,
    OverlayModule
  ],
  declarations: [
    ConfirmComponent
  ],
  entryComponents: [
    ConfirmComponent
  ],
  providers: [
    ConfirmService
  ]
})
export class ConfirmModule { }
