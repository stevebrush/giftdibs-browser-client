import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterModule
} from '@angular/router';

import {
  IconModule
} from '../icon';

import {
  OverlayModule
} from '../overlay';

import { DropdownMenuTriggerDirective } from './dropdown-menu-trigger.directive';
import { DropdownMenuComponent } from './dropdown-menu.component';
import { DropdownMenuService } from './dropdown-menu.service';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    OverlayModule,
    RouterModule
  ],
  exports: [
    DropdownMenuTriggerDirective
  ],
  declarations: [
    DropdownMenuComponent,
    DropdownMenuTriggerDirective
  ],
  providers: [
    DropdownMenuService
  ],
  entryComponents: [
    DropdownMenuComponent
  ]
})
export class DropdownMenuModule { }
