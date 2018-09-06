import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  IconModule, ConfirmModule, NoticeModule
} from '@app/ui';

import {
  DibService
} from '../dib';

import {
  DibEditComponent,
  DibEditModule
} from '../dib-edit';

import {
  DibControlsComponent
} from './dib-controls.component';

@NgModule({
  imports: [
    CommonModule,
    ConfirmModule,
    DibEditModule,
    IconModule,
    NoticeModule
  ],
  declarations: [
    DibControlsComponent
  ],
  exports: [
    DibControlsComponent
  ],
  providers: [
    DibService
  ],
  entryComponents: [
    DibEditComponent
  ]
})
export class DibControlsModule { }
