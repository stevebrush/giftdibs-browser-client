import {
  NgModule
} from '@angular/core';

import {
  BrowserModule
} from '@angular/platform-browser';

import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import {
  NavbarModule
} from '@app/shared/modules/navbar';

import {
  VerifyEmailNoticeModule
} from '@app/shared/modules/verify-email-notice';

import {
  SessionModule
} from '@giftdibs/session';

import {
  AlertModule
} from '@giftdibs/ux';

import {
  environment
} from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AlertModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    NavbarModule,
    SessionModule.forRoot(environment.apiUrl),
    VerifyEmailNoticeModule
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: []
})
export class AppModule { }
