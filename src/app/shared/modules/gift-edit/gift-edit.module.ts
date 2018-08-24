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
} from '@app/ui';

import {
  AssetsModule
} from '../assets';

import {
  GiftEditComponent
} from './gift-edit.component';
import { GiftModule } from '@app/shared/modules/gift/gift.module';

@NgModule({
  imports: [
    AssetsModule,
    CheckboxModule,
    CommonModule,
    FormFieldModule,
    FormsModule,
    GdImageUploaderModule,
    GiftModule,
    GridModule,
    IconModule,
    ModalModule,
    ReactiveFormsModule
  ],
  declarations: [
    GiftEditComponent
  ],
  entryComponents: [
    GiftEditComponent
  ]
})
export class GiftEditModule { }
