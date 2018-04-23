import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';

import {
  RouterModule
} from '@angular/router';

import { MediaModule } from '../media/media.module';
import { AuthInterceptor } from '../session/authorization.interceptor';
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class SearchModule { }
