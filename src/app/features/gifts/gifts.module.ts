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
  RouterModule
} from '@angular/router';

import {
  CheckboxModule,
  DropdownMenuModule,
  FormFieldModule,
  GridModule,
  IconModule,
  MediaModule,
  ModalModule,
  ThumbnailModule
} from '../../modules';

import {
  DibsModule
} from '../dibs';

import {
  GiftDetailComponent
} from './gift-detail.component';

import {
  GiftEditComponent
} from './gift-edit.component';

import {
  GiftPreviewComponent
} from './gift-preview.component';

import {
  GiftPriorityComponent
} from './gift-priority.component';

import {
  GiftService
} from './gift.service';

@NgModule({
  declarations: [
    GiftDetailComponent,
    GiftEditComponent,
    GiftPreviewComponent,
    GiftPriorityComponent
  ],
  entryComponents: [
    GiftDetailComponent,
    GiftEditComponent
  ],
  imports: [
    CheckboxModule,
    CommonModule,
    DibsModule,
    DropdownMenuModule,
    FormFieldModule,
    FormsModule,
    IconModule,
    MediaModule,
    ModalModule,
    ReactiveFormsModule,
    RouterModule,
    ThumbnailModule,
    GridModule
  ],
  exports: [
    GiftPreviewComponent,
    GiftPriorityComponent
  ],
  providers: [
    GiftService
  ]
})
export class GiftsModule { }
