import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ConfirmModule,
  IconModule,
  NoticeModule
} from '@app/ui';

import {
  DibService
} from '@app/shared/modules/dib';

import {
  DibEditComponent,
  DibEditModule
} from '@app/shared/modules/dib-edit';

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
