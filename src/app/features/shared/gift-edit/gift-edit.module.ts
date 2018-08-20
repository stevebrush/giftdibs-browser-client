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
  GdImageUploaderModule,
  GridModule,
  IconModule,
  ModalModule
} from '../../../modules';

import {
  AssetsModule
} from '../../assets';

import {
  GiftEditComponent
} from './gift-edit.component';

@NgModule({
  imports: [
    AssetsModule,
    CheckboxModule,
    CommonModule,
    FormFieldModule,
    FormsModule,
    GdImageUploaderModule,
    GridModule,
    IconModule,
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
