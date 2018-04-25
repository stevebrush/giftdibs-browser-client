import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  HttpClientModule
} from '@angular/common/http';

import {
  RouterModule
} from '@angular/router';

import { MediaModule } from '../media/media.module';

import {
  GD_AUTHORIZATION_PROVIDERS
} from '../session';

import { TypeaheadModule } from '../typeahead/typeahead.module';
import { UserThumbnailModule } from '../user-thumbnail/user-thumbnail.module';

import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MediaModule,
    RouterModule,
    TypeaheadModule,
    UserThumbnailModule
  ],
  exports: [
    SearchComponent
  ],
  declarations: [
    SearchComponent
  ],
  providers: [
    GD_AUTHORIZATION_PROVIDERS
  ]
})
export class SearchModule { }
