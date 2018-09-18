import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { RibbonComponent } from './ribbon.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RibbonComponent
  ],
  exports: [
    RibbonComponent
  ]
})
export class RibbonModule { }
