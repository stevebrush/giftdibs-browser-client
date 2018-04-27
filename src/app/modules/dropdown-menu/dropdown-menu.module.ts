import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { DropdownMenuComponent } from './dropdown-menu.component';
import { DropdownMenuService } from './dropdown-menu.service';
import { DropdownMenuTriggerDirective } from './dropdown-menu-trigger.directive';

@NgModule({
  imports: [
    CommonModule
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
