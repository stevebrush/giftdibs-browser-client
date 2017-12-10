import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GDFormFieldComponent } from './form-field.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GDFormFieldComponent
  ],
  exports: [
    GDFormFieldComponent
  ]
})
export class GDFormFieldModule { }
