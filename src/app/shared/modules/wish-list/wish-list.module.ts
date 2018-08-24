import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  WishListService
} from './wish-list.service';
import { WishListBoardService } from './wish-list-board.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    WishListService,
    WishListBoardService
  ]
})
export class WishListModule { }
