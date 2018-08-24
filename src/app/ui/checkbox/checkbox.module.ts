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
  IconModule
} from '../icon';

import {
  CheckboxComponent
} from './checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconModule,
    ReactiveFormsModule
  ],
  declarations: [
    CheckboxComponent
  ],
  exports: [
    CheckboxComponent
  ]
})
export class CheckboxModule { }
