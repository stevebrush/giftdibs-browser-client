import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RowComponent } from './row.component';
import { ColumnComponent } from './column.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RowComponent,
    ColumnComponent
  ],
  exports: [
    RowComponent,
    ColumnComponent
  ]
})
export class GridModule { }
