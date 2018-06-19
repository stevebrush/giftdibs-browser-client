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
  FormFieldModule
} from '../../../modules';

import {
  PrivacySelectorModule
} from '../privacy-selector';

import {
  WishListCreateComponent
} from './wish-list-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormFieldModule,
    FormsModule,
    PrivacySelectorModule,
    ReactiveFormsModule
  ],
  declarations: [
    WishListCreateComponent
  ],
  exports: [
    WishListCreateComponent
  ]
})
export class WishListCreateModule {}
