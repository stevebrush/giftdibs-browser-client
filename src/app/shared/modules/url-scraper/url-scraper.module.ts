import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  GridModule,
  ModalModule,
  ThumbnailModule,
  WaitModule
} from '@app/ui';

import { UrlImagesLoaderContext } from './url-images-loader-context';
import { UrlImagesLoaderComponent } from './url-images-loader.component';
import { UrlImagesSelectorContext } from './url-images-selector-context';
import { UrlImagesSelectorComponent } from './url-images-selector.component';

@NgModule({
  declarations: [
    UrlImagesLoaderComponent,
    UrlImagesSelectorComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    ModalModule,
    ThumbnailModule,
    WaitModule
  ],
  entryComponents: [
    UrlImagesLoaderComponent,
    UrlImagesSelectorComponent
  ],
  providers: [
    UrlImagesLoaderContext,
    UrlImagesSelectorContext
  ]
})
export class UrlScraperModule {}
