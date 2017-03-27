import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComposerComponent } from './card-composer.component';

import { CardModule } from '../card/card.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule
  ],
  declarations: [
    CardComposerComponent
  ],
  exports: [
    CardComposerComponent
  ]
})
export class CardComposerModule { }
