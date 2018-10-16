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
  FormFieldModule,
  ModalModule,
  WaitModule
} from '@app/ui';

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
    ModalModule,
    PrivacySelectorModule,
    ReactiveFormsModule,
    WaitModule
  ],
  declarations: [
    WishListCreateComponent
  ],
  entryComponents: [
    WishListCreateComponent
  ]
})
export class WishListCreateModule {}
