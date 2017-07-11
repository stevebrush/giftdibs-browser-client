import { NgModule } from '@angular/core';

import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [],
  exports: [
    AlertComponent
  ],
  providers: [
    AlertService
  ]
})
export class AlertModule { }
