import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { TypeaheadResultsComponent } from './typeahead-results.component';
import { TypeaheadComponent } from './typeahead.component';

@NgModule({
  imports: [
    CommonModule
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
