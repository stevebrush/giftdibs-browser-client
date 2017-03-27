import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BucketComponent } from './bucket.component';
import { BucketHeaderComponent } from './bucket-header.component';
import { BucketBodyComponent } from './bucket-body.component';
import { BucketFooterComponent } from './bucket-footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BucketComponent,
    BucketHeaderComponent,
    BucketBodyComponent,
    BucketFooterComponent
  ],
  exports: [
    BucketComponent,
    BucketHeaderComponent,
    BucketBodyComponent,
    BucketFooterComponent
  ]
})
export class BucketModule { }
