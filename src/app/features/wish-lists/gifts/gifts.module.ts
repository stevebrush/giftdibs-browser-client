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
  CheckboxModule
} from '../../../modules/checkbox';

import {
  FormFieldModule
} from '../../../modules/form-field';

import {
  GridModule
} from '../../../modules/grid';

import {
  IconModule
} from '../../../modules/icon';

import {
  ModalModule
} from '../../../modules/modal';

import {
  GiftDetailComponent
} from './detail';

import {
  GiftEditComponent
} from './edit';

import {
  GiftService
} from './gift.service';

@NgModule({
  declarations: [
    GiftDetailComponent,
    GiftEditComponent
  ],
  entryComponents: [
    GiftDetailComponent,
    GiftEditComponent
  ],
  imports: [
    CheckboxModule,
    CommonModule,
    FormFieldModule,
    FormsModule,
    IconModule,
    ModalModule,
    ReactiveFormsModule,
    GridModule
  ],
  providers: [
    GiftService
  ]
})
export class GiftsModule { }
