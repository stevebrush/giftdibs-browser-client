import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeaheadComponent } from './typeahead.component';
import { TypeaheadResultsComponent } from './typeahead-results.component';

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
