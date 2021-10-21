import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductService } from './product.service';

@NgModule({
  imports: [CommonModule],
  providers: [ProductService],
})
export class ProductModule {}
