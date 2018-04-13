import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusTrapDirective } from './focus-trap.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FocusTrapDirective
  ],
  declarations: [
    FocusTrapDirective
  ]
})
export class FocusTrapModule { }
