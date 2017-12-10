import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GDButtonDirective } from './button.directive';
import { GDButtonContainerComponent } from './button-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GDButtonDirective,
    GDButtonContainerComponent
  ],
  exports: [
    GDButtonDirective,
    GDButtonContainerComponent
  ]
})
export class GDButtonModule { }
