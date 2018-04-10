import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeaheadComponent } from './typeahead.component';
import { DropdownModule } from '../dropdown/dropdown.module';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule
  ],
  exports: [
    TypeaheadComponent
  ],
  declarations: [
    TypeaheadComponent
  ]
})
export class TypeaheadModule { }
