import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { AffixDirective } from './affix.directive';
import { AffixService } from './affix.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    AffixDirective
  ],
  declarations: [
    AffixDirective
  ],
  providers: [
    AffixService
  ]
})
export class AffixModule { }
