import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { AuthInterceptor } from './authorization.interceptor';
import { AuthGuard } from './authorization.guard';
import { SessionService } from './session.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    SessionService
  ]
})
export class SessionModule { }
