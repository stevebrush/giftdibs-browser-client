import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssetsModule } from '@app/shared/modules/assets';
import { GiftModule } from '@app/shared/modules/gift';
import { ProductModule } from '@app/shared/modules/product';
import { UrlScraperModule } from '@app/shared/modules/url-scraper';
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
        GiftModule,
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
    declarations: [GiftEditComponent]
})
export class GiftEditModule {}
