import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { GDCardComponent } from './card.component';
import { GDCardBodyComponent } from './card-body.component';
import { GDCardFooterComponent } from './card-footer.component';
import { GDCardTitleComponent } from './card-title.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GDCardComponent,
    GDCardBodyComponent,
    GDCardFooterComponent,
    GDCardTitleComponent
  ],
  exports: [
    GDCardComponent,
    GDCardBodyComponent,
    GDCardFooterComponent,
    GDCardTitleComponent
  ]
})
export class GDCardModule { }
