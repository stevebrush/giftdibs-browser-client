import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header.component';
import { CardHeadingComponent } from './card-heading.component';
import { CardBodyComponent } from './card-body.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    CardHeaderComponent,
    CardHeadingComponent,
    CardBodyComponent
  ],
  declarations: [
    CardComponent,
    CardHeaderComponent,
    CardHeadingComponent,
    CardBodyComponent
  ]
})
export class CardModule { }
