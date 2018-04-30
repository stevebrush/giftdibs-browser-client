import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm.component';
import { OverlayModule } from '../overlay/overlay.module';
import { FocusTrapModule } from '../focus-trap/focus-trap.module';
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
