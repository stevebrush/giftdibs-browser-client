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
} from '../../modules/checkbox';

import {
  FormFieldModule
} from '../../modules/form-field';

import {
  GridModule
} from '../../modules/grid';

import {
  IconModule
} from '../../modules/icon';

import {
  ModalModule
} from '../../modules/modal';

import {
  DibsModule
} from '../dibs';

import {
  GiftDetailComponent
} from './gift-detail.component';

import {
  GiftEditComponent
} from './gift-edit.component';

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
    DibsModule,
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
