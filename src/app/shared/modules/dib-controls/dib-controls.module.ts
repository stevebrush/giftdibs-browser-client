import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterModule
} from '@angular/router';

import {
  ConfirmModule,
  MediaModule,
  NoticeModule
} from '@giftdibs/ux';

import {
  IconModule
} from '@giftdibs/ux';

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
    MediaModule,
    NoticeModule,
    RouterModule
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
