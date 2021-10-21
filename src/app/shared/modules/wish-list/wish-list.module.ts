import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WishListService } from './wish-list.service';

@NgModule({
  imports: [CommonModule],
  providers: [WishListService],
})
export class WishListModule {}
