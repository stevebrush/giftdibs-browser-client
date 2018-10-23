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
  CharacterCounterModule,
  CheckboxModule,
  FormFieldModule,
  ModalModule
} from '@giftdibs/ux';

import {
  DibEditComponent
} from './dib-edit.component';

@NgModule({
  imports: [
    CharacterCounterModule,
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
