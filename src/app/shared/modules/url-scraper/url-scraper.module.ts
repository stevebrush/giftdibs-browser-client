import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrlImagesSelectorComponent } from './url-images-selector.component';
import { UrlImagesSelectorContext } from './url-images-selector-context';
import { ModalModule, ThumbnailModule } from '@app/ui';
import { UrlImagesLoaderContext } from './url-images-loader-context';
import { UrlImagesLoaderComponent } from '@app/shared/modules/url-scraper/url-images-loader.component';

@NgModule({
  declarations: [
    UrlImagesLoaderComponent,
    UrlImagesSelectorComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
    ThumbnailModule
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
