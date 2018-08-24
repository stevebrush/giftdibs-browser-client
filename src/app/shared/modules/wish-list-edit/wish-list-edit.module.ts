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
  FormFieldModule, ModalModule, ConfirmModule
} from '@app/ui';

import {
  PrivacySelectorModule
} from '../privacy-selector';

import {
  WishListEditComponent
} from './wish-list-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ConfirmModule,
    FormFieldModule,
    FormsModule,
    ModalModule,
    PrivacySelectorModule,
    ReactiveFormsModule
  ],
  declarations: [
    WishListEditComponent
  ],
  entryComponents: [
    WishListEditComponent
  ]
})
export class WishListEditModule {}
