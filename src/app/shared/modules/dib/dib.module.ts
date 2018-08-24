import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  DibService
} from './dib.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DibService
  ]
})
export class DibModule { }
