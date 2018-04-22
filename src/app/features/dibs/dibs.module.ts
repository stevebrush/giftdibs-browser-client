import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DibsRoutingModule } from './dibs-routing.module';
import { DibsComponent } from './dibs.component';

@NgModule({
  imports: [
    CommonModule,
    DibsRoutingModule
  ],
  declarations: [DibsComponent]
})
export class DibsModule { }
