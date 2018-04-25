import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header.component';
import { CardHeadingComponent } from './card-heading.component';
import { CardBodyComponent } from './card-body.component';
import { CardFooterComponent } from './card-footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CardBodyComponent,
    CardComponent,
    CardFooterComponent,
    CardHeaderComponent,
    CardHeadingComponent
  ],
  declarations: [
    CardComponent,
    CardHeaderComponent,
    CardHeadingComponent,
    CardBodyComponent,
    CardFooterComponent
  ]
})
export class CardModule { }
