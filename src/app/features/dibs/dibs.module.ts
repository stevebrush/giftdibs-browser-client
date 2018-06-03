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
  CardModule,
  CheckboxModule,
  FormFieldModule,
  GridModule,
  IconModule,
  MediaModule,
  ModalModule,
  RepeaterModule,
  ThumbnailModule
} from '../../modules';

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
    CardModule,
    CheckboxModule,
    CommonModule,
    DibsRoutingModule,
    FormFieldModule,
    FormsModule,
    GridModule,
    IconModule,
    MediaModule,
    ModalModule,
    ReactiveFormsModule,
    RepeaterModule,
    ThumbnailModule
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
