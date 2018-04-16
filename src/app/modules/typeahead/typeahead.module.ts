import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { FocusTrapModule } from '../focus-trap/focus-trap.module';

import { TypeaheadComponent } from './typeahead.component';
import { TypeaheadResultsComponent } from './typeahead-results.component';

@NgModule({
  imports: [
    CommonModule,
    FocusTrapModule
  ],
  exports: [
    TypeaheadComponent
  ],
  declarations: [
    TypeaheadComponent,
    TypeaheadResultsComponent
  ],
  entryComponents: [
    TypeaheadResultsComponent
  ]
})
export class TypeaheadModule { }
