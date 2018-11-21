import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ProductService
} from './product.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
