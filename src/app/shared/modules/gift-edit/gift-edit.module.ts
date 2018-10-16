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
  CharacterCounterModule,
  CheckboxModule,
  ConfirmModule,
  FormFieldModule,
  GdImageUploaderModule,
  GridModule,
  IconModule,
  MediaModule,
  ModalModule,
  ThumbnailModule,
  WaitModule
} from '@app/ui';

import {
  AssetsModule
} from '@app/shared/modules/assets';

import {
  GiftModule
} from '@app/shared/modules/gift';

import {
  UrlScraperModule
} from '@app/shared/modules/url-scraper';

import {
  GiftEditComponent
} from './gift-edit.component';

@NgModule({
  imports: [
    AssetsModule,
    CharacterCounterModule,
    CheckboxModule,
    CommonModule,
    ConfirmModule,
    FormFieldModule,
    FormsModule,
    GdImageUploaderModule,
    GiftModule,
    GridModule,
    IconModule,
    MediaModule,
    ModalModule,
    ReactiveFormsModule,
    ThumbnailModule,
    UrlScraperModule,
    WaitModule
  ],
  declarations: [
    GiftEditComponent
  ],
  entryComponents: [
    GiftEditComponent
  ]
})
export class GiftEditModule { }
