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
  FormFieldModule, ModalModule
} from '../../../modules';

import {
  PrivacySelectorModule
} from '../privacy-selector';

import {
  WishListEditComponent
} from './wish-list-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormFieldModule,
    FormsModule,
    ModalModule,
    PrivacySelectorModule,
    ReactiveFormsModule
  ],
  declarations: [
    WishListEditComponent
  ]
})
export class WishListEditModule {}
