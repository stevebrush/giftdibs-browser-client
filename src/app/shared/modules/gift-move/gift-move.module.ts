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
} from '@giftdibs/ux';

import {
  WishListModule
} from '../wish-list';

import {
  GiftMoveComponent
} from './gift-move.component';

@NgModule({
  imports: [
    CommonModule,
    FormFieldModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule,
    WaitModule,
    WishListModule
  ],
  declarations: [
    GiftMoveComponent
  ],
  entryComponents: [
    GiftMoveComponent
  ]
})
export class GiftMoveModule { }
