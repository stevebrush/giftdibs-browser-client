import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule, ModalModule, WaitModule } from '@giftdibs/ux';

import { WishListModule } from '../wish-list';

import { GiftMoveComponent } from './gift-move.component';

@NgModule({
  imports: [
    CommonModule,
    FormFieldModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule,
    WaitModule,
    WishListModule,
  ],
  declarations: [GiftMoveComponent],
})
export class GiftMoveModule {}
