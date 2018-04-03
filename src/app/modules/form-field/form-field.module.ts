import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './form-field.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [FormFieldComponent],
  declarations: [FormFieldComponent]
})
export class FormFieldModule { }
