import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GDModalComponent } from './modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GDModalComponent
  ],
  exports: [
    GDModalComponent
  ]
})
export class GDModalModule { }
