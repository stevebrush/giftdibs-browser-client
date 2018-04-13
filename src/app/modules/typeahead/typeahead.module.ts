import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeaheadComponent } from './typeahead.component';
import { TypeaheadResultsComponent } from './typeahead-results.component';
import { FocusTrapModule } from '../focus-trap/focus-trap.module';

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
