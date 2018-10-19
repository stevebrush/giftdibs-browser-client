import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  PopoverDirective
} from './popover.directive';

import { PopoverComponent } from './popover.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PopoverComponent,
    PopoverDirective
  ],
  exports: [
    PopoverDirective
  ],
  entryComponents: [
    PopoverComponent
  ]
})
export class PopoverModule { }
