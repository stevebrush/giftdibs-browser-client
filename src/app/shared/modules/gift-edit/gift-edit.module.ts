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
  CheckboxModule,
  FormFieldModule,
  GdImageUploaderModule,
  GridModule,
  IconModule,
  ModalModule,
  ThumbnailModule,
  MediaModule
} from '@app/ui';

import {
  AssetsModule
} from '../assets';

import {
  GiftEditComponent
} from './gift-edit.component';
import { GiftModule } from '@app/shared/modules/gift/gift.module';
import { UrlScraperModule } from '@app/shared/modules/url-scraper';

@NgModule({
  imports: [
    AssetsModule,
    CheckboxModule,
    CommonModule,
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
    UrlScraperModule
  ],
  declarations: [
    GiftEditComponent
  ],
  entryComponents: [
    GiftEditComponent
  ]
})
export class GiftEditModule { }
