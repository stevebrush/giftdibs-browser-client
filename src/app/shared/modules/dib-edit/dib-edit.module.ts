import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  CheckboxModule,
  FormFieldModule,
  ModalModule
} from '@app/ui';

import {
  DibEditComponent
} from './dib-edit.component';

@NgModule({
  imports: [
    CheckboxModule,
    CommonModule,
    FormFieldModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule
  ],
  declarations: [
    DibEditComponent
  ],
  exports: [
    DibEditComponent
  ]
})
export class DibEditModule { }
