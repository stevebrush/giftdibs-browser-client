import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  FormFieldModule
} from '../../modules/form-field';

import {
  IconModule
} from '../../modules/icon';

import {
  ModalModule
} from '../../modules/modal';

import {
  RepeaterModule
} from '../../modules/repeater';

import {
  DibControlsComponent
} from './dib-controls.component';

import {
  DibEditComponent
} from './dib-edit.component';

import { DibService } from './dib.service';
import { DibsRoutingModule } from './dibs-routing.module';
import { DibsComponent } from './dibs.component';

@NgModule({
  imports: [
    CommonModule,
    DibsRoutingModule,
    FormFieldModule,
    FormsModule,
    IconModule,
    ModalModule,
    ReactiveFormsModule,
    RepeaterModule
  ],
  declarations: [
    DibsComponent,
    DibControlsComponent,
    DibEditComponent
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
export class DibsModule { }
