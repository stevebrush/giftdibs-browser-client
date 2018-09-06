import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { IconComponent } from './icon.component';
import { IconStackComponent } from '@app/ui/icon/icon-stack.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IconComponent,
    IconStackComponent
  ],
  exports: [
    IconComponent,
    IconStackComponent
  ]
})
export class IconModule { }
