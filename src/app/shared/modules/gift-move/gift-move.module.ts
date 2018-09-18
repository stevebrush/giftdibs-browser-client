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
  ModalModule
} from '@app/ui';

import {
  GiftMoveComponent
} from './gift-move.component';

@NgModule({
  imports: [
    CommonModule,
    FormFieldModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule
  ],
  declarations: [
    GiftMoveComponent
  ]
})
export class GiftMoveModule { }
