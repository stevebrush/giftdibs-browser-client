import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  WishListService
} from './wish-list.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    WishListService
  ]
})
export class WishListsModule { }
