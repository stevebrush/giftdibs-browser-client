// #region imports
import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { RepeaterControlsComponent } from './repeater-controls.component';
import { RepeaterItemComponent } from './repeater-item.component';
import { RepeaterComponent } from './repeater.component';
// #endregion

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    RepeaterControlsComponent,
    RepeaterComponent,
    RepeaterItemComponent
  ],
  declarations: [
    RepeaterControlsComponent,
    RepeaterComponent,
    RepeaterItemComponent
  ]
})
export class RepeaterModule { }
