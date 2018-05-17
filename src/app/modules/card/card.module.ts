import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { CardBodyComponent } from './card-body.component';
import { CardControlsComponent } from './card-controls.component';
import { CardFooterComponent } from './card-footer.component';
import { CardHeaderComponent } from './card-header.component';
import { CardHeadingComponent } from './card-heading.component';
import { CardComponent } from './card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CardBodyComponent,
    CardComponent,
    CardControlsComponent,
    CardFooterComponent,
    CardHeaderComponent,
    CardHeadingComponent
  ],
  declarations: [
    CardBodyComponent,
    CardComponent,
    CardControlsComponent,
    CardFooterComponent,
    CardHeaderComponent,
    CardHeadingComponent
  ]
})
export class CardModule { }
