import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GDButtonDirective } from './button.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GDButtonDirective
  ],
  exports: [
    GDButtonDirective
  ]
})
export class GDButtonModule { }
