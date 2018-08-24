import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  GdPopoverDirective
} from './popover.directive';

import { GdPopoverComponent } from './popover.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GdPopoverComponent,
    GdPopoverDirective
  ],
  exports: [
    GdPopoverDirective
  ],
  entryComponents: [
    GdPopoverComponent
  ]
})
export class GdPopoverModule { }
