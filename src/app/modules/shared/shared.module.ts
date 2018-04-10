import { NgModule } from '@angular/core';
import { CardModule } from '../card/card.module';

@NgModule({
  exports: [
    CardModule
  ]
})
export class SharedModule { }
