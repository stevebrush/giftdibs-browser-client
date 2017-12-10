import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GDRowComponent } from './row.component';
import { GDColumnComponent } from './column.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GDRowComponent,
    GDColumnComponent
  ],
  exports: [
    GDRowComponent,
    GDColumnComponent
  ]
})
export class GDGridModule { }
