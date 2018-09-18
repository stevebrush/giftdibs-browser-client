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

import {
  MediaModule
} from '../media';

import {
  TypeaheadModule
} from '../typeahead';

import {
  ThumbnailModule
} from '../thumbnail';

import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MediaModule,
    RouterModule,
    TypeaheadModule,
    ThumbnailModule
  ],
  exports: [
    SearchComponent
  ],
  declarations: [
    SearchComponent
  ]
})
export class SearchModule { }
