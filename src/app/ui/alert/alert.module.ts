import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import {
  AlertComponent
} from './alert.component';

import {
  AlertService
} from './alert.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule
  ],
  declarations: [
    AlertComponent
  ],
  providers: [
    AlertService
  ],
  entryComponents: [
    AlertComponent
  ]
})
export class AlertModule { }
