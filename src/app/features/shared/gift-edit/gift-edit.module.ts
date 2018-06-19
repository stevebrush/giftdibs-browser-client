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
} from '../../../modules';

import {
  GiftEditComponent
} from './gift-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormFieldModule,
    FormsModule,
    CheckboxModule,
    ModalModule,
    ReactiveFormsModule
  ],
  declarations: [
    GiftEditComponent
  ],
  exports: [
    GiftEditComponent
  ]
})
export class GiftEditModule { }
