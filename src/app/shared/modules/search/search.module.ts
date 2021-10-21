import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MediaModule, ThumbnailModule, TypeaheadModule } from '@giftdibs/ux';

import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MediaModule,
    RouterModule,
    TypeaheadModule,
    ThumbnailModule,
  ],
  exports: [SearchComponent],
  declarations: [SearchComponent],
})
export class SearchModule {}
