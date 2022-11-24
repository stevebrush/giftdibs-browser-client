import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CharacterCounterModule,
  CheckboxModule,
  FormFieldModule,
  GridModule,
  ImageUploaderModule,
  MediaModule,
  ModalModule,
  ThumbnailModule,
  WaitModule,
} from '@giftdibs/ux';
import { IconModule } from '@giftdibs/ux';

import { AssetsModule } from 'src/app/shared/modules/assets';
import { ProductModule } from 'src/app/shared/modules/product';
import { UrlScraperModule } from 'src/app/shared/modules/url-scraper';

import { GiftEditComponent } from './gift-edit.component';

@NgModule({
  imports: [
    AssetsModule,
    CharacterCounterModule,
    CheckboxModule,
    CommonModule,
    FormFieldModule,
    FormsModule,
    ImageUploaderModule,
    GridModule,
    IconModule,
    MediaModule,
    ModalModule,
    ProductModule,
    ReactiveFormsModule,
    ThumbnailModule,
    UrlScraperModule,
    WaitModule,
  ],
  declarations: [GiftEditComponent],
})
export class GiftEditModule {}
