import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GDInputDirective } from './input.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GDInputDirective
  ],
  exports: [
    GDInputDirective
  ]
})
export class GDInputModule { }
