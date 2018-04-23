import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { DropdownMenuComponent } from './dropdown-menu.component';
import { DropdownMenuService } from './dropdown-menu.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DropdownMenuComponent
  ],
  providers: [
    DropdownMenuService
  ],
  entryComponents: [
    DropdownMenuComponent
  ]
})
export class DropdownMenuModule { }
