import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GDAlertComponent } from './alert.component';
import { GDAlertService } from './alert.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GDAlertComponent
  ],
  exports: [
    GDAlertComponent
  ],
  providers: [
    GDAlertService
  ]
})
export class GDAlertModule { }
