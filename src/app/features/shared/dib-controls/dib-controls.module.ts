import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  IconModule
} from '../../../modules';

import {
  DibService
} from '../../dibs';

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
    DibEditModule,
    IconModule
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
